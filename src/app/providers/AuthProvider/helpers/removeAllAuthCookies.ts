import Cookies from "js-cookie";
import getCookieConfig from "./getCookieConfig";
import { AUTH_TOKEN, AUTH_TOKEN_EXPIRES_AT } from "~/config";

export default function removeAllAuthCookies() {
  const cookieConfig = getCookieConfig();

  Cookies.remove(AUTH_TOKEN, {
    path: cookieConfig.path,
    domain: cookieConfig.domain,
  });
  Cookies.remove(AUTH_TOKEN_EXPIRES_AT, {
    path: cookieConfig.path,
    domain: cookieConfig.domain,
  });
}
