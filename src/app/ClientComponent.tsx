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
          //
        }}
      >
        hi
      </button>
    </div>
  );
}
