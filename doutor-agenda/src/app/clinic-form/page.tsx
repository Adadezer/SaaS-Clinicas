import React from "react";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import ClinicForm from "./components/form";

function ClinicFormPage() {
  return (
    <Dialog open={true}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Adicione uma clínica</DialogTitle>
          <DialogDescription>
            Adicione uma clínica para que você possa gerenciar seus pacientes.
          </DialogDescription>
        </DialogHeader>

        <ClinicForm />
      </DialogContent>
    </Dialog>
  );
}

export default ClinicFormPage;
