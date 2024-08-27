export const IS_PROD = process.env.NODE_ENV === "production";

export const APP_NAME = process.env.NEXT_PUBLIC_APP_NAME || "Ingra";
export const APP_DESCRIPTION =
  process.env.NEXT_PUBLIC_APP_DESCRIPTION ||
  "Open source personalized AI assistant, agents and tools for developers to build customized LLM functions tool calling.";
export const APP_URL =
  process.env.NEXT_PUBLIC_APP_URL || "https://hubs.ingra.ai";
export const PARENT_APP_URL =
  process.env.NEXT_PUBLIC_PARENT_APP_URL || "https://www.ingra.ai";

export const APP_AUTH_CALLBACK_URI =
  process.env.NEXT_PUBLIC_AUTH_CALLBACK_URI || "/api/auth/callback";
export const APP_AUTH_LOGIN_URI =
  process.env.NEXT_PUBLIC_AUTH_LOGIN_URI || "/auth/login";
export const APP_LANDING_PAGE_URI =
  process.env.NEXT_PUBLIC_LANDING_PAGE_URI || "/overview";

const APP_LEGAL_PRIVACY_POLICY_URI =
  process.env.NEXT_PUBLIC_LEGAL_PRIVACY_POLICY_URI || "/legal/privacy-policy";
const APP_LEGAL_TOS_URI =
  process.env.NEXT_PUBLIC_LEGAL_TERMS_OF_SERVICE_URI ||
  "/legal/terms-of-service";
const APP_LEGAL_COOKPOL_URI =
  process.env.NEXT_PUBLIC_LEGAL_COOKPOL_URI || "/legal/cookie-policy";

export const APP_LEGAL_PRIVACY_POLICY_URL = [
  PARENT_APP_URL,
  APP_LEGAL_PRIVACY_POLICY_URI,
].join("");
export const APP_LEGAL_TOS_URL = [PARENT_APP_URL, APP_LEGAL_TOS_URI].join("");
export const APP_LEGAL_COOKPOL_URL = [
  PARENT_APP_URL,
  APP_LEGAL_COOKPOL_URI,
].join("");

export const APP_AUTH_CALLBACK_URL = APP_URL + APP_AUTH_CALLBACK_URI;
export const APP_AUTH_LOGIN_URL = APP_URL + APP_AUTH_LOGIN_URI;
export const APP_LANDING_PAGE_URL = APP_URL + APP_LANDING_PAGE_URI;

export const APP_SUPPORT_MAILTO =
  process.env.NEXT_PUBLIC_APP_SUPPORT_MAILTO || "support@ingra.ai";
export const APP_SESSION_COOKIE_NAME =
  process.env.NEXT_PUBLIC_APP_SESSION_COOKIE_NAME || "ING_SESSION";
export const APP_SESSION_API_KEY_NAME =
  process.env.NEXT_PUBLIC_APP_SESSION_API_KEY_NAME || "x-api-key";

export const APP_SETTINGS_PROFILE_URI = "/settings/profile";
export const APP_SETTINGS_INTEGRATIONS_URI = "/settings/integrations";
export const APP_SETTINGS_API_URI = "/settings/api";
export const APP_SETTINGS_ENV_VARS_URI = "/settings/env-vars";

/**
 * The version of the app as defined in package.json
 */
export const APP_PACKAGE_VERSION = process.env.npm_package_version || "0.0.1";

/**
 * VM Sandbox Configuration
 */
export const VM_SANDBOX_EXECUTION_TIMEOUT_SECONDS = 60;

/**
 * OPENAI Variables
 */
export const OPENAI_API_KEY = process.env.OPENAI_API_KEY || "";

/**
 * OPENAI Plugin Variables
 */
export const APP_OPENAI_VERIFICATION_TOKEN =
  process.env.NEXT_PUBLIC_OPENAI_VERIFICATION || "";
export const APP_OPENAI_MANIFEST_NAME_FOR_MODEL = "IngraVirtualAssistant";
export const APP_OPENAI_MANIFEST_NAME_FOR_HUMAN = "Ingra Assistant";
export const APP_OPENAI_MANIFEST_DESC_FOR_MODEL =
  "A portal to curate and manage personal assistant functions and workflows, providing a community-driven approach to personal assistant development.";
export const APP_OPENAI_MANIFEST_DESC_FOR_HUMAN =
  "Ingra Portal helps you curate and manage functions or workflows to create your own personal assistant suite tailored to your needs. Our goal is to make these functions freely available for everyone, enabling a community-driven approach to personal assistant development.";

/**
 * Google Plugins
 */
export const APP_GOOGLE_OAUTH_CLIENT_ID =
  process.env.GOOG_OAUTH_CLIENT_ID || "";
export const APP_GOOGLE_OAUTH_CLIENT_SECRET =
  process.env.GOOG_OAUTH_CLIENT_SECRET || "";
export const APP_GOOGLE_OAUTH_CALLBACK_URI =
  process.env.NEXT_PUBLIC_GOOG_OAUTH_CALLBACK_URI || "/auth/google/callback";
export const APP_GOOGLE_OAUTH_CALLBACK_URL =
  APP_URL + APP_GOOGLE_OAUTH_CALLBACK_URI;
export const APP_GOOGLE_OAUTH_REDIRECT_URL =
  APP_URL + APP_SETTINGS_INTEGRATIONS_URI;

/**
 * MARKETPLACE API
 */
// export const MARKETPLACE_API_ROOT_PATH = '/api/v1/marketplace';
// export const MARKETPLACE_API_ROOT_URL = APP_URL + MARKETPLACE_API_ROOT_PATH;
// export const MARKETPLACE_API_FUNCTION_PATH = [MARKETPLACE_API_ROOT_PATH, 'functions', ':slug'].join('/');

/**
 * API
 */
export const USER_API_ROOT_PATH = "/api/v1";
export const USER_API_ROOT_URL = APP_URL + USER_API_ROOT_PATH;
// This should reflect the path of the API in the app
// !! Requires to replace the ":vars" with actual values,
export const USERS_API_FUNCTION_URI = [
  USER_API_ROOT_PATH,
  ":userName",
  "functions",
  ":functionSlug",
].join("/");
export const USERS_API_COLLECTION_URI = [
  USER_API_ROOT_PATH,
  ":userName",
  "collections",
  ":collectionSlug",
].join("/");
export const USERS_API_COLLECTION_FUNCTION_URI = [
  USERS_API_COLLECTION_URI,
  ":functionSlug",
].join("/");

/**
 * ME API
 */
export const ME_API_ROOT_PATH = "/api/v1/me";
export const ME_API_ROOT_URL = APP_URL + ME_API_ROOT_PATH;

/**
 * SUBSCRIPTIONS API
 * 18 Aug - Removed as subscription logic is merged with the user API
 */

/**
 * Chat with Assistant
 */
export const BAKA_ASSISTANT_NAME = "Ingra";
export const BAKA_ASSISTANT_ROOT_PATH = USER_API_ROOT_PATH + "/assistants";
export const BAKA_ASSISTANT_ID = process.env.OPENAI_ASSISTANT_ID || "";
export const BAKA_ASSISTANT_USER_THREAD_COOKIE_NAME = "BAKAI_THREAD_ID";
export const BAKA_ASSISTANT_USER_THREAD_COOKIE_MAX_AGE = 7200; // 2hr

/**
 * Analytics
 */
export const HOTJAR_ID = process.env.NEXT_PUBLIC_HOTJAR_ID || "";
export const MIXPANEL_TOKEN = process.env.NEXT_PUBLIC_MIXPANEL_TOKEN || "";

/**
 * Langchain
 */
export const LANGCHAIN_CHAT_RECURSION_LIMIT =
  parseInt(process.env.NEXT_PUBLIC_LANGCHAIN_CHAT_RECURSION_LIMIT || "10") ||
  10;