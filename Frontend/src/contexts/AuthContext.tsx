"use client";

import { ReactNode, createContext, useEffect, useState } from "react";
import { setCookie, parseCookies } from "nookies";
import { useRouter } from "next/navigation";

import axios from "axios";
import { message } from "antd";

type User = {
  // email: string;
  // name: string;
  username: string;
  balance: number;
  password?: string;
  // date: string;
  // gender: string;
};

export type SignInData = {
  username: string;
  password: string;
};

// export type UpdateUserData = {
//   email: string;
//   name: string;
//   date: string;
//   gender: string;
// };

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
  seeUserAccountTransactions: () => Promise<void | JSON>;
  // updateUser: (data: UpdateUserData) => Promise<void | JSON>;
  // deleteUser: () => Promise<void | JSON>;
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

    // Atualiza os dados do usuário após o login
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

    // return { username, password };
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
    // console.log(data);
    setIsLoading(false);
    return data;
    // return message;
  }

  // async function updateUser({ email, name, date, gender }: UpdateUserData) {
  //   setIsLoading(true);
  //   const { "nextauth.token": token } = parseCookies();

  //   try {
  //     const response = await axios.put(
  //       "http://localhost:3333/users/profile/update",
  //       {
  //         email,
  //         name,
  //         date,
  //         gender,
  //       },
  //       {
  //         headers: {
  //           Authorization: `Bearer ${token}`,
  //         },
  //       }
  //     );

  //     const { message } = await response.data;
  //     setIsLoading(false);
  //     return message;
  //   } catch (error) {
  //     setIsLoading(false);
  //     console.error("Error updating user", error);
  //     return Promise.reject("Error updating user");
  //   }
  // }

  // async function deleteUser() {
  //   setIsLoading(true);
  //   const { "nextauth.token": token } = parseCookies();

  //   try {
  //     const response = await axios.delete(
  //       "http://localhost:3333/users/profile/delete",
  //       {
  //         headers: {
  //           Authorization: `Bearer ${token}`,
  //         },
  //       }
  //     );

  //     const { message } = await response.data;
  //     setIsLoading(false);
  //     logOut();
  //     return message;
  //   } catch (error) {
  //     setIsLoading(false);
  //     console.error("Error deleting user", error);
  //     return Promise.reject("Error deleting user");
  //   }
  // }

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
        // updateUser,
        // deleteUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
