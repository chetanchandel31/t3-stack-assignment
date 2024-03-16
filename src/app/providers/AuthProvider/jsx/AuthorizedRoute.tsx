"use client";

import { type ReactNode, useEffect } from "react";
import { useAuth } from "../index";
import { useRouter } from "next/navigation";
import Spinner from "~/app/_components/Spinner";

export default function AuthorizedRoute({ children }: { children: ReactNode }) {
  const auth = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!auth.isLoggedIn) {
      router.push("/logIn");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [auth.isLoggedIn]);

  if (!auth.isLoggedIn) {
    return <Spinner />;
  }

  return <>{children}</>;
}
