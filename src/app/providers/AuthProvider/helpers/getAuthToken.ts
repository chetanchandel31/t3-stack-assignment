import Cookies from "js-cookie";
import { AUTH_TOKEN } from "~/config";

export default function getAccessToken() {
  return Cookies.get(AUTH_TOKEN);
}
