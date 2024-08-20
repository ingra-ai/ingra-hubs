import { getAuthSession } from '@app/auth/session';
import db from '@lib/db';
import { isUuid } from "@lib/utils";
import { CommunityFunctionItem } from '@components/data/functions/CommunityFunctionItem';
import { notFound } from 'next/navigation';
import CommunityCollectionViewDetails from '@components/data/collections/CommunityCollectionViewDetails';
import { getUserProfileByUsername } from '@data/profile';

export default async function Page({ params }: { params: { ownerUsername: string; recordId: string } }) {
  const { recordId, ownerUsername } = params;

  if ( !recordId || !isUuid(recordId) ) {
    return notFound();
  }

  const [ownerProfile, authSession] = await Promise.all([
    // Get userId from ownerUsername
    getUserProfileByUsername(ownerUsername),

    // Get current user session
    getAuthSession()
  ]);

  if (!ownerProfile?.userId || !ownerUsername) {
    return notFound();
  }

  const callerUserId = authSession?.user.id,
    ownerUserId = ownerProfile.userId;

  const collectionRecord = await db.collection.findUnique({
    where: {
      id: recordId,
      functions: {
        some: {
          isPublished: true,
          isPrivate: false,
        },
      },
    },
    select: {
      id: true,
      name: true,
      slug: true,
      description: true,
      updatedAt: true,
      functions: {
        select: {
          id: true,
          slug: true,
          code: false,
          description: true,
          httpVerb: true,
          isPrivate: true,
          isPublished: true,
          ownerUserId: true,
          createdAt: false,
          updatedAt: true,
          tags: {
            select: {
              id: true,
              name: true,
              functionId: false,
              function: false,
            }
          },
          arguments: {
            select: {
              id: true,
              name: true,
              description: false,
              type: true,
              defaultValue: false,
              isRequired: false,
            }
          },
          owner: {
            select: {
              id: true,
              profile: {
                select: {
                  userName: true,
                }
              }
            }
          },
          ...( ( callerUserId !== ownerUserId ) ? {
            subscribers: {
              where: {
                userId: callerUserId,
              },
              select: {
                id: true,
              },
            },
          } : {} )
        }
      }
    }
  });

  if (!collectionRecord) {
    return notFound();
  }

  // Transform the `subscribers` field into a boolean `isSubscribed`
  const functionsWithSubscriptionStatus = collectionRecord.functions.map(functionRecord => ({
    ...functionRecord,
    isSubscribed: Array.isArray( functionRecord?.subscribers ) && functionRecord.subscribers.length > 0
  }));

  return (
    <div className="block" data-testid="community-collection-view-page">
      <div className="grid grid-cols-1 md:grid-cols-3 xl:grid-cols-12 gap-6">
        <div className="col-span-1 md:col-span-1 xl:col-span-4 space-y-4">
          <CommunityCollectionViewDetails record={collectionRecord} />
        </div>
        <div className="col-span-1 md:col-span-2 xl:col-span-8 space-y-4">
          <h2 className="text-lg font-bold text-gray-100 truncate min-w-0" title={'Functions'}>Functions ({collectionRecord.functions.length.toLocaleString(undefined, { minimumFractionDigits: 0 })})</h2>
          <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 xl:grid-cols-3 xl:gap-3 2xl:grid-cols-4 2xl:gap-4">
            {
              functionsWithSubscriptionStatus.map((functionRecord) => (
                <CommunityFunctionItem
                  key={functionRecord.id}
                  functionData={functionRecord}
                  href={`/repo/${ownerUsername}/functions/view/${functionRecord.id}`}
                />
              ))
            }
          </div>
        </div>
      </div>
    </div>
  );
}