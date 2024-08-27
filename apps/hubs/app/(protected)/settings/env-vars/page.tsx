import type { Metadata } from "next";
import { RedirectType, redirect } from "next/navigation";
import db from "@repo/db/client";
import { APP_AUTH_LOGIN_URL } from "@repo/shared/lib/constants";
import { APP_NAME } from "@repo/shared/lib/constants";
import { EnvVarsSection } from "@repo/components/data/envVars/EnvVarsSection";
import { getAuthSession } from "@repo/shared/data/auth/session";

export const metadata: Metadata = {
  title: ["Environment Variables", APP_NAME].join(" | "),
};

export default async function Page() {
  const authSession = await getAuthSession();

  if (!authSession) {
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
      {allEnvVars && <EnvVarsSection envVars={allEnvVars} />}
    </div>
  );
}
