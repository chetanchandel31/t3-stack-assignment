import { Button } from "~/components/ui/button";
import CardContainer from "../_components/CardContainer";
import Link from "next/link";
import LogInForm from "./LogInForm";
import AuthScreen from "../providers/AuthProvider/jsx/AuthScreen";

type Props = {};

export default function LogIn({}: Props) {
  return (
    <AuthScreen>
      <CardContainer>
        <div className="flex flex-col items-stretch gap-12">
          <div>
            <div className="pb-6 text-center text-3xl font-semibold">Login</div>
            <div className="text-center text-xl font-semibold">
              Welcome back to ECOMMERCE
            </div>
            <div className="text-center text-sm">
              The next gen business marketplace
            </div>
          </div>

          <LogInForm />

          <div className="flex items-center justify-center">
            Don&apos;t have an account?{" "}
            <Button asChild size={"sm"} variant={"link"}>
              <Link href={"/signUp"}>Sign up</Link>
            </Button>
          </div>
        </div>
      </CardContainer>
    </AuthScreen>
  );
}
