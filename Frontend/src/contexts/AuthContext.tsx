"use client";

import { ReactNode, createContext, useEffect, useState } from "react";
import { setCookie, parseCookies } from "nookies";
import { useRouter } from "next/navigation";

import axios from "axios";
import { message } from "antd";

type User = {
  username: string;
  balance?: number;
  password?: string;
};

type TransferMoneyUsingUsernameData = {
  targetUsername: string;
  amount: string;
};

export type SignInData = {
  username: string;
  password: string;
};

export type AuthContextType = {
  isAuthenticated: boolean;
  user: User | null;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
  signIn: ({ username, password }: SignInData) => Promise<void>;
  logOut: () => void;
  recoverUserInformation: () => Promise<void | {
    username: string;
    balance: number;
  }>;
  registerUser: (user: User) => Promise<void | JSON>;
  seeUserAccountTransactions: () => Promise<void | JSON | any>;
  transferMoneyUsingUsername: ({
    targetUsername,
    amount,
  }: TransferMoneyUsingUsernameData) => Promise<void | JSON>;
  isLoading: boolean;
};

type AuthProviderProps = {
  children: ReactNode;
};

export const AuthContext = createContext({} as AuthContextType);

export function AuthProvider({ children }: AuthProviderProps) {
  const Router = useRouter();

  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const { "nextauth.token": token } = parseCookies();
    if (token) {
      recoverUserInformation().then((response) => {
        if (response) {
          setUser(response);
        }
      });
    }
  }, []);

  const isAuthenticated = !!user;

  async function signIn({ username, password }: SignInData) {
    const response = await axios.post("http://localhost:3333/sessions", {
      username,
      password,
    });

    const { token } = await response.data;

    setCookie(undefined, "nextauth.token", token, {
      maxAge: 60 * 60 * 1 * 24, // 24 hour
    });

    // Set Authorization header for all subsequent requests
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;

    // Update user data after login
    await recoverUserInformation();

    message.success("Login success!");
    Router.push("/mainpage");
  }

  async function logOut() {
    setCookie(undefined, "nextauth.token", "", { maxAge: -1 });
    delete axios.defaults.headers.common["Authorization"];
    setUser(null);
    Router.replace("/");
    message.success("Logout success!");
  }

  async function recoverUserInformation(): Promise<void | {
    username: string;
    balance: number;
  }> {
    const { "nextauth.token": token } = parseCookies();

    const response = await axios.get("http://localhost:3333/user/balance", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const { username, balance } = response.data;
    setUser({ username, balance });
  }

  async function registerUser({ username, password }: User) {
    setIsLoading(true);
    const { "nextauth.token": token } = parseCookies();

    const response = await axios.post(
      "http://localhost:3333/users",
      {
        username,
        password,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    setIsLoading(false);
    message.success("Register success!");
  }

  async function seeUserAccountTransactions() {
    setIsLoading(true);
    const { "nextauth.token": token } = parseCookies();

    const response = await axios.get(
      "http://localhost:3333/user/transactions",
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    const data = await response.data;
    setIsLoading(false);
    return data;
  }

  async function transferMoneyUsingUsername({
    targetUsername,
    amount,
  }: TransferMoneyUsingUsernameData) {
    setIsLoading(true);
    const { "nextauth.token": token } = parseCookies();

    const response = await axios.post(
      "http://localhost:3333/user/transfer",
      {
        targetUsername,
        amount,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    setIsLoading(false);
    message.success("Transfer success!");
  }

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        isLoading,
        user,
        setUser,
        signIn,
        logOut,
        recoverUserInformation,
        registerUser,
        seeUserAccountTransactions,
        transferMoneyUsingUsername,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
