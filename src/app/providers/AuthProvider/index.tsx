"use client";

import { createContext, type ReactNode, useContext, useState } from "react";
import removeAllAuthCookies from "./helpers/removeAllAuthCookies";
import setAllAuthCookies from "./helpers/setAllAuthCookies";

export type SetAuthorizedUser = ({}: {
  authToken: string;
  authTokenExpiresAt: number;
}) => void;

type AuthContextInterface = {
  isLoggedIn: boolean;
  setAuthorizedUser: SetAuthorizedUser;
  removeAuthorizedUser: () => void;
};

const logWarning = () =>
  console.warn("the component probably isn't wrapped with auth-context");

const AuthContext = createContext<AuthContextInterface>({
  isLoggedIn: false,
  setAuthorizedUser: logWarning,
  removeAuthorizedUser: logWarning,
});

/**
 * it is for containing and "synchronously" updating auth state in
 * 1. Cookies
 * 2. React state
 *
 * it becomes messy if i start adding related network request logic here too
 * so i avoid that.
 *
 * if within components there is need for some helper that deals with both
 * network requests and this state, it may be better to create some custom hook
 * that makes use of `useAuth` and some react query hook under the hood.
 *
 */

export default function AuthProvider({
  authTokenFromServerRequest,
  children,
}: {
  authTokenFromServerRequest: string | undefined;
  children: ReactNode;
}) {
  const [isLoggedIn, setIsLoggedIn] = useState(!!authTokenFromServerRequest);

  const setAuthorizedUser: SetAuthorizedUser = ({
    authToken,
    authTokenExpiresAt,
  }) => {
    setAllAuthCookies({ authToken, authTokenExpiresAt });
    setIsLoggedIn(true);
  };

  const removeAuthorizedUser = () => {
    removeAllAuthCookies();
    setIsLoggedIn(false);
  };

  return (
    <AuthContext.Provider
      value={{ isLoggedIn, setAuthorizedUser, removeAuthorizedUser }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
