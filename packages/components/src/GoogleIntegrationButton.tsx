'use client';

import React from 'react';
import type { FC } from 'react';
import { APP_GOOGLE_OAUTH_CALLBACK_URL } from '@repo/shared/lib/constants';

type GoogleIntegrationButtonProps = {
  type: 'redirect';
  text?: string;
};

export const GoogleIntegrationButton: FC<GoogleIntegrationButtonProps> = (props) => {
  const { text = 'Google', type = 'redirect' } = props;

  const redirectToGoogleUrl = new URL(APP_GOOGLE_OAUTH_CALLBACK_URL);

  // This is important as the callback URL serves 2 purposes;
  // 1. Redirecting to Google OAuth (This component)
  // 2. Handling the response from Google OAuth
  redirectToGoogleUrl.searchParams.append('type', type);

  return (
    <a
      href={redirectToGoogleUrl.toString()}
      className="text-white bg-[#4285F4] hover:bg-[#4285F4]/90 focus:ring-4 focus:outline-none focus:ring-[#4285F4]/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center justify-between dark:focus:ring-[#4285F4]/55 mr-2 mb-2"
    >
      <svg className="mr-2 -ml-1 w-4 h-4" aria-hidden="true" focusable="false" data-prefix="fab" data-icon="google" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 488 512">
        <path
          fill="currentColor"
          d="M488 261.8C488 403.3 391.1 504 248 504 110.8 504 0 393.2 0 256S110.8 8 248 8c66.8 0 123 24.5 166.3 64.9l-67.5 64.9C258.5 52.6 94.3 116.6 94.3 256c0 86.5 69.1 156.6 153.7 156.6 98.2 0 135-70.4 140.8-106.9H248v-85.3h236.1c2.3 12.7 3.9 24.9 3.9 41.4z"
        ></path>
      </svg>
      {text}
    </a>
  );
};
