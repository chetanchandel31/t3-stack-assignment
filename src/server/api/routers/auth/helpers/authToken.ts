import jwt from "jsonwebtoken";
import { env } from "~/env";

const SECRET = env.SECRET;

export function generateAuthToken({
  userId,
  expiresInSeconds = 60 * 60 * 24, // 24 hours
}: {
  userId: string;
  expiresInSeconds?: number;
}) {
  const authToken = jwt.sign({ userId }, SECRET, {
    expiresIn: expiresInSeconds,
  });

  const authTokenExpiresAtMs = Date.now() + expiresInSeconds * 1000;

  return { authToken, authTokenExpiresAtMs };
}

