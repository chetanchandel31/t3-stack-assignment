import Cookies from "js-cookie";
import getCookieConfig from "./getCookieConfig";
import { AUTH_TOKEN, AUTH_TOKEN_EXPIRES_AT } from "~/config";

export default function setAllAuthCookies({
  authToken,
  authTokenExpiresAt,
}: {
  authToken: string;
  authTokenExpiresAt: number;
}) {
  const cookieConfig = getCookieConfig();

  Cookies.set(AUTH_TOKEN, authToken, {
    path: cookieConfig.path,
    domain: cookieConfig.domain,
    expires: new Date(authTokenExpiresAt * 1000),
  });
  Cookies.set(AUTH_TOKEN_EXPIRES_AT, String(authTokenExpiresAt), {
    path: cookieConfig.path,
    domain: cookieConfig.domain,
    expires: new Date(authTokenExpiresAt * 1000),
  });
}
