import { getAuthSession } from '@app/auth/session';
import { GenerateApiKeyButton } from '@protected/settings/api/GenerateApiKeyButton';
import db from '@lib/db';
import { ApiKeysTable } from './ApiKeysTable';
import { RedirectType, redirect } from 'next/navigation';
import { APP_AUTH_LOGIN_URL } from '@lib/constants';

export default async function Page() {
  const authSession = await getAuthSession();

  if ( !authSession ) {
    redirect(APP_AUTH_LOGIN_URL, RedirectType.replace);
  }
  
  const allApiKeys = await db.apiKey.findMany({
    where: {
      userId: authSession.user.id,
    },
  });

  return (
    <div className="mt-7 leading-7 container max-w-4xl ml-0">
      {/* Table to display all api keys */}
      {allApiKeys && (
        <ApiKeysTable apiKeys={allApiKeys} />
      )}
    </div>
  );
}
