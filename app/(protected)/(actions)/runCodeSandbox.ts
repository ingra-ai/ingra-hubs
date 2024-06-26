'use server';
import { executeFunction } from '@app/api/utils/vm/executeFunction';
import { getAuthSession } from '@app/auth/session';
import { ActionError } from '@v1/types/api-response';

export async function runCodeSandbox(functionId: string, args: Record<string, any> = {}, isMarketplace = false) {
  const authSession = await getAuthSession();

  if ( !authSession ) {
    throw new ActionError('error', 401, `Unauthorized session.`);
  }

  return await executeFunction(authSession, functionId, args, isMarketplace);
}
