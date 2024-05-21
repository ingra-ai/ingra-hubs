export const APP_NAME = process.env.NEXT_PUBLIC_APP_NAME || 'Bakabit';
export const APP_DESCRIPTION = process.env.NEXT_PUBLIC_APP_DESCRIPTION || 'Bakabit Utility App';
export const APP_URL = process.env.NEXT_PUBLIC_APP_URL || 'https://portal.bakabit.com';
export const PARENT_APP_URL = process.env.NEXT_PUBLIC_PARENT_APP_URL || 'https://bakabit.com';

export const APP_AUTH_CALLBACK_URI = process.env.NEXT_PUBLIC_AUTH_CALLBACK_URI || '/auth/callback';
export const APP_AUTH_LOGIN_URI = process.env.NEXT_PUBLIC_AUTH_LOGIN_URI || '/auth/login';
export const APP_LANDING_PAGE_URI = process.env.NEXT_PUBLIC_LANDING_PAGE_URI || '/dashboard';

export const APP_LEGAL_PRIVACY_POLICY_URI = process.env.NEXT_PUBLIC_LEGAL_PRIVACY_POLICY_URI || '/legal/privacy-policy';
export const APP_LEGAL_TOS_URI = process.env.NEXT_PUBLIC_LEGAL_TERMS_OF_SERVICE_URI || '/legal/terms-of-service';

export const APP_AUTH_CALLBACK_URL = APP_URL + APP_AUTH_CALLBACK_URI;
export const APP_AUTH_LOGIN_URL = APP_URL + APP_AUTH_LOGIN_URI;
export const APP_LANDING_PAGE_URL = APP_URL + APP_LANDING_PAGE_URI;

export const APP_SUPPORT_MAILTO = process.env.NEXT_PUBLIC_APP_SUPPORT_MAILTO || 'support@bakabit.com';
export const APP_SESSION_COOKIE_NAME = process.env.NEXT_PUBLIC_APP_SESSION_COOKIE_NAME || 'BAKA_SESSION';
export const APP_SESSION_API_KEY_NAME = process.env.NEXT_PUBLIC_APP_SESSION_API_KEY_NAME || 'x-api-key';

export const APP_PROFILE_URL = [APP_URL, 'settings/profile'].join('/');

/**
 * API Security
 */
export const APP_X_API_KEY = process.env.X_API_KEY || '';

/**
 * OPENAI Plugin Variables
 */
export const APP_OPENAI_VERIFICATION_TOKEN = process.env.NEXT_PUBLIC_OPENAI_VERIFICATION || '';
export const APP_OPENAI_MANIFEST_NAME_FOR_MODEL = 'BakabitVirtualAssistant';
export const APP_OPENAI_MANIFEST_NAME_FOR_HUMAN = 'Bakabit Assistant';
export const APP_OPENAI_MANIFEST_DESC_FOR_MODEL = "A portal to curate and manage personal assistant functions and workflows, providing a community-driven approach to personal assistant development."
export const APP_OPENAI_MANIFEST_DESC_FOR_HUMAN = "Bakabit Portal helps you curate and manage functions or workflows to create your own personal assistant suite tailored to your needs. Our goal is to make these functions freely available for everyone, enabling a community-driven approach to personal assistant development."

/**
 * Google Plugins
 */
export const APP_GOOGLE_OAUTH_CLIENT_ID = process.env.GOOG_OAUTH_CLIENT_ID || '';
export const APP_GOOGLE_OAUTH_CLIENT_SECRET = process.env.GOOG_OAUTH_CLIENT_SECRET || '';
export const APP_GOOGLE_OAUTH_CALLBACK_URI = process.env.NEXT_PUBLIC_GOOG_OAUTH_CALLBACK_URI || '/auth/google/callback';
export const APP_GOOGLE_OAUTH_CALLBACK_URL = APP_URL + APP_GOOGLE_OAUTH_CALLBACK_URI;
export const APP_GOOGLE_OAUTH_REDIRECT_URL = APP_PROFILE_URL;

/**
 * MARKETPLACE API
 */
export const MARKETPLACE_API_ROOT_PATH = '/api/v1/marketplace';
export const MARKETPLACE_API_ROOT_URL = APP_URL + MARKETPLACE_API_ROOT_PATH;
export const MARKETPLACE_API_FUNCTION_PATH = [MARKETPLACE_API_ROOT_PATH, ':username', 'functions', ':slug'].join('/');

/**
 * USERS API
*/
export const USERS_API_ROOT_PATH = '/api/v1/me';
export const USERS_API_ROOT_URL = APP_URL + USERS_API_ROOT_PATH;
// This should reflect the path of the API in the app
// !! Requires to replace the username and slug,
// !! -- only use this wherever you have access to user profile and function slug
export const USERS_API_FUNCTION_PATH = [USERS_API_ROOT_PATH, 'functions', ':slug'].join('/');

/**
 * The version of the app as defined in package.json
 */
export const APP_PACKAGE_VERSION = process.env.npm_package_version || '0.0.1';
