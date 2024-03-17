import { NextRequest, NextResponse } from 'next/server';
import { APP_OPENAI_MANIFEST_DESC_FOR_HUMAN, APP_OPENAI_MANIFEST_DESC_FOR_MODEL, APP_OPENAI_MANIFEST_NAME_FOR_HUMAN, APP_OPENAI_MANIFEST_NAME_FOR_MODEL, APP_OPENAI_VERIFICATION_TOKEN, APP_SUPPORT_MAILTO, APP_URL } from '../../../lib/constants';

export async function GET(request: NextRequest) {
  return NextResponse.json(
    {
      schema_version: 'v1',
      name_for_human: APP_OPENAI_MANIFEST_NAME_FOR_HUMAN,
      name_for_model: APP_OPENAI_MANIFEST_NAME_FOR_MODEL,
      description_for_human: APP_OPENAI_MANIFEST_DESC_FOR_HUMAN,
      description_for_model: APP_OPENAI_MANIFEST_DESC_FOR_MODEL,

      /**
       * Auth can be 'none', 'service_auth' or 'oauth'
       * @see https://platform.openai.com/docs/plugins/authentication
       */
      // "auth": {
      //   "type": "service_http",
      //   "authorization_type": "bearer",
      //   "verification_tokens": {
      //     "openai": APP_OPENAI_VERIFICATION_TOKEN
      //   }
      // },
      auth: {
        type: 'none',
      },
      api: {
        type: 'openapi',
        url: `${APP_URL}/api/openapi.json`,
      },
      logo_url: `${APP_URL}/static/brand/bakabit-white-logo-only-png`,
      contact_email: APP_SUPPORT_MAILTO,
      legal_info_url: `${APP_URL}/legal`,
    },
    {
      status: 200,
    }
  );
}

// Notice the funciton definiton:
export async function POST(request: NextRequest) {
  return NextResponse.json(
    { error: 'Method not allowed' },
    {
      status: 405,
    }
  );
}
