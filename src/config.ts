export const config = {
  otpExpiresInMs: 1000 * 60 * 4, // i.e. 4 mins
  otpLength: 6,
} as const;

export const AUTH_TOKEN = "rc8-ecom-auth-token";
export const AUTH_TOKEN_EXPIRES_AT = "rc8-ecom-auth-token-expires-at";
export const URL_BEFORE_AUTH = "rc8-ecom-url-before-auth";
