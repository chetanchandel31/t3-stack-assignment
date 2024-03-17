import { TRPCError } from "@trpc/server";
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

export function getUserIdFromAuthToken({ authToken }: { authToken: string }) {
  const decodedData = jwt.verify(authToken, SECRET);

  if (
    typeof decodedData === "string" ||
    typeof decodedData?.userId !== "string"
  ) {
    throw new TRPCError({
      code: "UNAUTHORIZED",
      message: "Bad auth token",
    });
  }

  return decodedData?.userId;
}
