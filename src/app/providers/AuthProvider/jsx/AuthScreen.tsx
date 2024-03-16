"use client";

import { type ReactNode, useEffect } from "react";
import { useAuth } from "../index";
import { useRouter } from "next/navigation";
import Spinner from "~/app/_components/Spinner";

const getMostPreferredAuthorizedRoute = () => {
  return "/";
};

export default function AuthScreen({ children }: { children: ReactNode }) {
  const auth = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (auth.isLoggedIn) {
      router.push(getMostPreferredAuthorizedRoute());
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [auth.isLoggedIn]);

  if (auth.isLoggedIn) {
    return <Spinner />;
  }

  return <>{children}</>;
}
