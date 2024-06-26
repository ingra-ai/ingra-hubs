import { getAuthSession } from '@app/auth/session';
import db from '@lib/db';
import { RedirectType, redirect } from 'next/navigation';
import { APP_AUTH_LOGIN_URL } from '@lib/constants';
import { EnvVarsSection } from './EnvVarsSection';
import { APP_NAME } from '@lib/constants';
import type { Metadata } from 'next'
 
export const metadata: Metadata = {
  title: ['Environment Variables', APP_NAME].join(' | '),
}

export default async function Page() {
  const authSession = await getAuthSession();

  if ( !authSession ) {
    redirect(APP_AUTH_LOGIN_URL, RedirectType.replace);
  }

  const allEnvVars = await db.envVars.findMany({
    where: {
      ownerUserId: authSession.user.id,
    },
  });

  return (
    <div className="mt-7 leading-7 container ml-0">
      {/* Table to display all environment variables */}
      {allEnvVars && (
        <EnvVarsSection envVars={allEnvVars} />
      )}
    </div>
  );
}
