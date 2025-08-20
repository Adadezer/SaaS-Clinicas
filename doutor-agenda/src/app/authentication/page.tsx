import { headers } from "next/headers";
import Image from "next/image";
import { redirect } from "next/navigation";
import React from "react";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { auth } from "@/lib/auth";

import LoginForm from "./components/login-form";
import SignUpForm from "./components/sign-up-form";

async function AuthenticationPage() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (session?.user) {
    redirect("/dashboard");
  }

  return (
    <div className="flex h-screen w-screen items-center justify-center">
      <div className="flex w-full max-w-sm flex-col gap-6">
        <Image
          src="/logo.svg"
          alt="Logo"
          width={200}
          height={200}
          className="align-center mx-auto mb-4"
        />

        <Tabs defaultValue="login">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="login" className="hover: cursor-pointer">
              Login
            </TabsTrigger>
            <TabsTrigger value="register" className="hover: cursor-pointer">
              Criar Conta
            </TabsTrigger>
          </TabsList>
          <TabsContent value="login">
            <LoginForm />
          </TabsContent>

          <TabsContent value="register">
            <SignUpForm />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}

export default AuthenticationPage;
