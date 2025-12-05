import { authVerifyToken } from "@/services/auth";
import { TAuthIsLogin, TAuthUser } from "@/stores/auth";
import { getSession } from "@/utils/session";
import { redirect } from "next/navigation";
import React from "react";
import Providers from "./_components/providers";

type TLayoutProps = {
  children: React.ReactNode;
};

export default async function Layout({ children }: TLayoutProps) {
  const session = await getSession();

  let isLogin: TAuthIsLogin = false;
  let user: TAuthUser | null = null;

  if (session?.accessToken) {
    await authVerifyToken({ token: session?.accessToken })
      .then((response) => {
        isLogin = true;
        user = response?.content?.user?.email ? response?.content?.user : null;
      })
      .catch(async () => {
        isLogin = false;
        user = null;

        redirect("/api/logout");
      });
  }

  if (isLogin) {
    redirect("/dashboard");
  } else {
    redirect("/login");
  }

  return (
    <Providers
      auth={{
        isLogin: isLogin,
        accessToken: session?.accessToken ?? "",
        user: user,
      }}
    >
      {children}
    </Providers>
  );
}
