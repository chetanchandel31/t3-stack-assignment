"use client";

import { api } from "~/trpc/react";

type Props = {};

export default function ClientComponent({}: Props) {
  const authSignUp = api.auth.signUp.useMutation({
    onSuccess: () => {
      //
    },
  });

  console.log(authSignUp.error?.data?.zodError?.fieldErrors);

  return (
    <div>
      <button
        onClick={async () => {
          const res = await authSignUp.mutateAsync({
            email: "chetanchandel31@gmail.com",
            password: "tolstoy2010",
            name: "abc",
          });
        }}
      >
        hi
      </button>
    </div>
  );
}
