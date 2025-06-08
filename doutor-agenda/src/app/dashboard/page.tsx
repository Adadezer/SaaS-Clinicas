import { headers } from "next/headers";
import { redirect } from "next/navigation";
import React from "react";

import { auth } from "@/lib/auth";

import SignOutButtom from "./componets/sign-out-buttom";

async function DashboardPage() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session?.user) {
    redirect("/authentication");
  }

  return (
    <div>
      <h1>Dashboard</h1>
      <h1>{session?.user?.name}</h1>
      <h1>{session?.user?.email}</h1>
      <SignOutButtom />
    </div>
  );
}

export default DashboardPage;
