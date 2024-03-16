import { env } from "~/env";

export default function getCookieConfig() {
  return {
    path: "/",
    domain: env.NEXT_PUBLIC_AUTH_COOKIE_DOMAIN,
  };
}
