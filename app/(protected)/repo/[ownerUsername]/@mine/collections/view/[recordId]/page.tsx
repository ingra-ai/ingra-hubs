import { getAuthSession } from '@app/auth/session';
import db from '@lib/db';
import { notFound } from 'next/navigation';
import CollectionViewDetails from './CollectionViewDetails';
import { FunctionItem } from '../../../functions/FunctionItem';

export default async function Page({ params }: { params: { ownerUsername: string; recordId: string } }) {
  const authSession = await getAuthSession();
  const { ownerUsername, recordId } = params;

  if (!recordId || !authSession || !ownerUsername) {
    return notFound();
  }

  const collectionRecord = await db.collection.findUnique({
    where: {
      id: recordId,
      userId: authSession.user.id,
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
          }
        }
      }
    }
  });

  if (!collectionRecord) {
    return notFound();
  }

  return (
    <div className="block" data-testid="collections-view-page">
      <div className="grid grid-cols-1 md:grid-cols-3 xl:grid-cols-12 gap-6">
        <div className="col-span-1 md:col-span-1 xl:col-span-4 space-y-4">
          <CollectionViewDetails ownerUsername={ownerUsername} record={collectionRecord} />
        </div>
        <div className="col-span-1 md:col-span-2 xl:col-span-8 space-y-4">
          <h2 className="text-lg font-bold text-gray-100 truncate min-w-0" title={'Functions'}>Functions ({collectionRecord.functions.length.toLocaleString(undefined, { minimumFractionDigits: 0 })})</h2>
          <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 xl:grid-cols-3 xl:gap-3 2xl:grid-cols-4 2xl:gap-4">
            {
              collectionRecord.functions.map((functionRecord) => (
                <FunctionItem key={functionRecord.id} functionData={functionRecord} href={`/repo/${ownerUsername}/functions/edit/${functionRecord.id}`} />
              ))
            }
          </div>
        </div>
      </div>
    </div>
  );
}
