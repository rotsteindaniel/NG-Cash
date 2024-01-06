"use client";

import { ReactNode, createContext, useEffect, useState } from "react";
import { setCookie, parseCookies } from "nookies";
import { useRouter } from "next/navigation";

import axios from "axios";

type User = {
  // email: string;
  // name: string;
  username: string;
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
  signIn: ({ email, password }: SignInData) => Promise<void>;
  logOut: () => void;
  // recoverUserInformation: () => Promise<void | { user: User }>;
  registerUser: (user: User) => Promise<void | JSON>;
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
    // const { "nextauth.token": token } = parseCookies();
    // if (token) {
    //   recoverUserInformation().then((response) => {
    //     setUser(response.user);
    //   });
    // }
  }, []);

  const isAuthenticated = !!user;

  async function signIn({ username, password }: SignInData) {
    try {
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
      // await recoverUserInformation();

      Router.push("/mainpage");
    } catch (error) {
      alert("Incorrect login or password.");
    }
  }

  async function logOut() {
    setCookie(undefined, "nextauth.token", "", { maxAge: -1 });
    delete axios.defaults.headers.common["Authorization"];
    setUser(null);
    Router.push("/");
  }

  // async function recoverUserInformation(): Promise<{ user: User }> {
  //   const { "nextauth.token": token } = parseCookies();

  //   const response = await axios.get("http://localhost:3333/users/profile", {
  //     headers: {
  //       Authorization: `Bearer ${token}`,
  //     },
  //   });

  //   const { email, name, date, gender } = response.data;
  //   setUser({ email, name, date, gender });

  //   return { user: { email, name, date, gender } };
  // }

  // async function registerUser({ email, password, name, date, gender }: User) {
  //   setIsLoading(true);
  //   const { "nextauth.token": token } = parseCookies();

  //   const response = await axios.post(
  //     "http://localhost:3333/users",
  //     {
  //       email,
  //       password,
  //       name,
  //       date,
  //       gender,
  //     },
  //     {
  //       headers: {
  //         Authorization: `Bearer ${token}`,
  //       },
  //     }
  //   );

  //   const { message } = await response.data;
  //   setIsLoading(false);
  //   return message;
  // }

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

    const { message } = await response.data;
    setIsLoading(false);
    return message;
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
        // recoverUserInformation,
        registerUser,
        // updateUser,
        // deleteUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
