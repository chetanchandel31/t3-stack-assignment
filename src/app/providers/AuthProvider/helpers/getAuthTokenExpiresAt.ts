import Cookies from "js-cookie";
import { AUTH_TOKEN_EXPIRES_AT } from "~/config";

export default function getAccessTokenExpiresAt() {
  return Cookies.get(AUTH_TOKEN_EXPIRES_AT)
    ? Number(Cookies.get(AUTH_TOKEN_EXPIRES_AT))
    : null;
}
