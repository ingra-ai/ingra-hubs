'use server';
import db from '@repo/db/client';
import { Prisma } from '@repo/db/prisma';
import { isUuid } from '@repo/shared/lib/utils';

export type FunctionAccessType =
  // User is the owner of the function
  | 'owner'

  // Other user's function where user is a subscriber and the function is not private
  | 'subscriber'

  // Function is part of a collection that user is subscribed to
  | 'subscribedCollection'

  // Function is part of marketplace
  | 'marketplace';

type GetFunctionAccessibleByUserDefaultArgsType = Pick<Prisma.FunctionFindFirstArgs, 'include' | 'select'> & {
  where?: Prisma.FunctionFindFirstArgs['where'];
};

type GetFunctionAccessibleByUserOptionsType<T extends GetFunctionAccessibleByUserDefaultArgsType> = {
  accessTypes: FunctionAccessType[];
  findFirstArgs?: T;
};

/**
 * Get the function record accessible by the user.
 * Whether the user is the owner, subscriber, or the function is part of a collection that the user is subscribed to.
 * @param {string} ownerUserIdOrName - The invoker user ID
 * @param {string} recordIdOrSlug - The function ID or slug
 * @param {GetFunctionAccessibleByUserOptionsType<T>} options - Optional. Specifies the access types and findFirstArgs.
 * @returns {Promise<Prisma.FunctionGetPayload<T> | null>} - Returns the function record accessible by the user. If not found, returns null.
 */
export async function getFunctionAccessibleByUser<T extends GetFunctionAccessibleByUserDefaultArgsType>(
  ownerUserIdOrName: string,
  recordIdOrSlug: string,
  options?: GetFunctionAccessibleByUserOptionsType<T>
): Promise<Prisma.FunctionGetPayload<T> | null> {
  const defaultOptions: GetFunctionAccessibleByUserOptionsType<GetFunctionAccessibleByUserDefaultArgsType> = {
      accessTypes: ['owner', 'subscriber', 'subscribedCollection'],
      findFirstArgs: {
        where: {},
        include: {
          arguments: true,
          tags: true,
        },
      },
    },
    accessTypes = Array.isArray(options?.accessTypes) ? options.accessTypes : defaultOptions.accessTypes,
    findFirstArgs = options?.findFirstArgs || defaultOptions.findFirstArgs;

  if (!accessTypes?.length || !findFirstArgs) {
    return null;
  }

  if ( !ownerUserIdOrName || !recordIdOrSlug ) {
    return null;
  }

  const isUserUuid = isUuid(ownerUserIdOrName),
    isRecordUuid = isUuid(recordIdOrSlug);

  // Define the query conditions based on the accessType
  const whereConditions: Prisma.FunctionWhereInput[] = [];

  if (accessTypes.indexOf('owner') >= 0) {
    /**
     * Case 1 - User is the owner
     */
    const whereCondition: Prisma.FunctionWhereInput = {};

    // Append the function condition
    if ( isRecordUuid ) {
      whereCondition.id = recordIdOrSlug;
    }
    else {
      whereCondition.slug = recordIdOrSlug;
    }

    // Append the owner condition
    if ( isUserUuid ) {
      whereCondition.ownerUserId = ownerUserIdOrName;
    }
    else {
      whereCondition.owner = {
        profile: {
          userName: ownerUserIdOrName,
        },
      };
    }

    whereConditions.push(whereCondition);
  }

  if (accessTypes.indexOf('subscriber') >= 0) {
    /**
     * Case 2 - User is a subscriber and its other user's function
     */
    whereConditions.push({
      AND: [
        {
          subscribers: {
            some: isUserUuid ? {
              userId: ownerUserIdOrName,
            } : {
              user: {
                profile: {
                  userName: ownerUserIdOrName,
                },
              }
            }
          },
        },
        isRecordUuid
          ? {
              id: recordIdOrSlug,
            }
          : {
              slug: recordIdOrSlug,
            },
        {
          isPublished: true,
          isPrivate: false,
        },
      ],
    });
  }

  if (accessTypes.indexOf('subscribedCollection') >= 0) {
    /**
     * Case 3 - Function is part of a collection that user is subscribed to.
     */
    whereConditions.push({
      AND: [
        {
          collectors: {
            some: {
              subscribers: {
                some: isUserUuid ? {
                  userId: ownerUserIdOrName,
                } : {
                  user: {
                    profile: {
                      userName: ownerUserIdOrName,
                    },
                  }
                }
              },
            },
          },
        },
        isRecordUuid
          ? {
              id: recordIdOrSlug,
            }
          : {
              slug: recordIdOrSlug,
            },
        {
          isPublished: true,
          isPrivate: false,
        },
      ],
    });
  }

  if (accessTypes.indexOf('marketplace') >= 0) {
    /**
     * Case 4 - Function is in marketplace
     */
    whereConditions.push({
      AND: [
        {
          isPublished: true,
          isPrivate: false,
        },
        isRecordUuid
          ? {
              id: recordIdOrSlug,
            }
          : {
              slug: recordIdOrSlug,
            },
        isUserUuid ? {
          ownerUserId: ownerUserIdOrName,
        } : {
          owner: {
            profile: {
              userName: ownerUserIdOrName,
            },
          }
        }
      ],
    });
  }

  // Append where conditions from the ones that is supplied in options
  if (findFirstArgs.where) {
    whereConditions.push(findFirstArgs.where);
  }

  // Find the function
  const functionRecord = (await db.function.findFirst({
    where: {
      OR: whereConditions,
    },
    ...(findFirstArgs.include ? { include: findFirstArgs.include } : {}),
    ...(findFirstArgs.select ? { select: findFirstArgs.select } : {}),
  })) as Prisma.FunctionGetPayload<T> | null;

  return functionRecord;
}
