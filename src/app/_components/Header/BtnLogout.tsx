"use client";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "~/components/ui/alert-dialog";
import { ExitIcon } from "@radix-ui/react-icons";
import { useAuth } from "~/app/providers/AuthProvider";
import {
  AlertDialogFooter,
  AlertDialogHeader,
} from "~/components/ui/alert-dialog";
import { Button } from "~/components/ui/button";
import { api } from "~/trpc/react";

type Props = {};

export default function BtnLogout({}: Props) {
  const auth = useAuth();
  const utils = api.useUtils();

  const onLogOut = async () => {
    auth.removeAuthorizedUser();
    await utils.invalidate();
  };

  if (!auth.isLoggedIn) {
    return null;
  }

  return (
    <>
      <AlertDialog>
        <AlertDialogTrigger asChild>
          <Button size={"sm"} variant={"destructive"}>
            <ExitIcon className="mr-2 h-4 w-4" />
            Log out
          </Button>
        </AlertDialogTrigger>

        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Log out?</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to log out?
            </AlertDialogDescription>
          </AlertDialogHeader>

          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>

            <AlertDialogAction asChild>
              <Button
                className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                onClick={onLogOut}
              >
                Log out
              </Button>
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
