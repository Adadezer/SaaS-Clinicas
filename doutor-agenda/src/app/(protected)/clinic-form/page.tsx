import React from "react";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import ClinicForm from "./_components/form";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

const ClinicFormPage = async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    redirect("/login");
  }

  if (!session.user.plan) {
    redirect("/plans"); // redirect("/new-subscription");
  }

  return (
    <Dialog open={true}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Adicione uma clínica</DialogTitle>
          <DialogDescription>
            Adicione uma clínica para continuar.
          </DialogDescription>
        </DialogHeader>
        <ClinicForm />
      </DialogContent>
    </Dialog>
  );
};

export default ClinicFormPage;
