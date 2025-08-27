"use client";

import { CirclePlus } from "lucide-react";
import React, { useState } from "react";

import { Dialog, DialogTrigger } from "@/components/ui/dialog";

import InsertDoctorAvailabilityForm from "./insert-doctor-availability-form";

interface AddDoctorAvailabilityButtonProps {
  doctorId: string;
}

function AddDoctorAvailabilityButton({
  doctorId,
}: AddDoctorAvailabilityButtonProps) {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  return (
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <DialogTrigger asChild>
        <div className="hover:text-primary hover:border-primary flex cursor-pointer items-center gap-2 text-sm">
          Adicionar mais horários
          <CirclePlus strokeWidth={0.8} />
        </div>
      </DialogTrigger>
      <InsertDoctorAvailabilityForm
        onSuccess={() => setIsDialogOpen(false)}
        doctorId={doctorId}
      />
    </Dialog>
  );
}

export default AddDoctorAvailabilityButton;
