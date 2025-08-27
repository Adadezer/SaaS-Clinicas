"use client";

import { CalendarIcon, ClockIcon, DollarSignIcon } from "lucide-react";
import { TrashIcon } from "lucide-react";
import { useAction } from "next-safe-action/hooks";
import { useState } from "react";
import { toast } from "sonner";

import { deleteDoctor } from "@/actions/delete-doctor";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import { doctorsTable } from "@/db/schema";
import { formatCurrencyInCents } from "@/helpers/currency";

import { getAvatarUrl } from "../../../../helpers/avatar-generate";
import { getAdditionalAvailability } from "../_helpers/adittional-availability";
import { getAvailability } from "../_helpers/availability";
import AddDoctorAvailabilityButton from "./add-doctor-availability-button";
import UpsertDoctorForm from "./upsert-doctor-form";

interface DoctorCardProps {
  doctor: typeof doctorsTable.$inferSelect & {
    availabilities?: {
      id: string;
      fromWeekDay: number;
      toWeekDay: number;
      fromTime: string;
      toTime: string;
    }[];
  };
}

const DoctorCard = ({ doctor }: DoctorCardProps) => {
  const [isUpsertDoctorDialogOpen, setIsUpsertDoctorDialogOpen] =
    useState(false);

  const deleteDoctorAction = useAction(deleteDoctor, {
    onSuccess: () => {
      toast.success("Médico deletado com sucesso.");
    },
    onError: () => {
      toast.error("Erro ao deletar médico.");
    },
  });

  const handleDeleteDoctorClick = () => {
    if (!doctor) return;
    deleteDoctorAction.execute({ id: doctor.id });
  };

  const availability = getAvailability(doctor);

  const avatarUrl = getAvatarUrl({
    name: doctor.name,
    lastName: doctor.lastName,
    sex: doctor.sex,
  });

  return (
    <Card className="h-full">
      <CardHeader>
        <div className="flex items-center gap-2">
          <Avatar className="h-10 w-10">
            <AvatarImage src={avatarUrl} alt={doctor.name} />
            <AvatarFallback>
              {doctor.name && doctor.lastName
                ? `${doctor.name[0]}${doctor.lastName[0]}`.toUpperCase()
                : "UK"}
            </AvatarFallback>
          </Avatar>
          <div>
            <h3 className="text-sm font-medium">{`${doctor.name} ${doctor.lastName}`}</h3>
            <p className="text-muted-foreground text-sm">{doctor.specialty}</p>
          </div>
        </div>
      </CardHeader>
      <Separator />

      <CardContent className="relative flex flex-1 flex-col items-center gap-2 p-2">
        <div className="absolute -top-2 flex-col gap-1">
          <AddDoctorAvailabilityButton doctorId={doctor.id} />
        </div>

        {/* Disponibilidade principal */}
        <div className="mt-6 flex gap-2 rounded-md p-2">
          <Badge variant="outline">
            <CalendarIcon className="mr-1" />
            {availability.from.format("dddd")} a{" "}
            {availability.to.format("dddd")}
          </Badge>
          <Badge variant="outline">
            <ClockIcon className="mr-1" />
            {availability.from.format("HH:mm")} às{" "}
            {availability.to.format("HH:mm")}
          </Badge>
        </div>

        {/* Disponibilidades adicionais */}
        {doctor.availabilities?.length ? (
          <div className="mt-1 mb-2 flex w-full flex-col flex-wrap gap-2">
            {doctor.availabilities.map((availability) => {
              const adittional = getAdditionalAvailability(availability);

              return (
                <div
                  key={availability.id}
                  className="flex flex-col flex-wrap items-center gap-2 rounded-md border border-solid p-2 md:flex-row"
                >
                  <Badge variant="outline" className="flex w-48">
                    <CalendarIcon className="mr-1" />
                    {adittional.from.format("dddd") ===
                    adittional.to.format("dddd")
                      ? adittional.from.format("dddd")
                      : `${adittional.from.format("dddd")} a ${adittional.to.format("dddd")}`}
                  </Badge>
                  <Badge variant="outline" className="flex">
                    <ClockIcon className="mr-1" />
                    {`${adittional.from.format("HH:mm")} às ${adittional.to.format("HH:mm")}`}
                  </Badge>
                  <TrashIcon className="h-4 w-4 hover:cursor-pointer" />
                </div>
              );
            })}
          </div>
        ) : null}

        <Badge variant="secondary" className="flex w-xs">
          <DollarSignIcon className="mr-1" />
          {formatCurrencyInCents(doctor.appointmentPriceInCents)}
        </Badge>
      </CardContent>
      <Separator />
      <CardFooter className="flex flex-col gap-2">
        <Dialog
          open={isUpsertDoctorDialogOpen}
          onOpenChange={setIsUpsertDoctorDialogOpen}
        >
          <DialogTrigger asChild>
            <Button className="w-full hover:cursor-pointer">
              Ver detalhes
            </Button>
          </DialogTrigger>
          <UpsertDoctorForm
            doctor={{
              ...doctor,
              availableFromTime: availability.from.format("HH:mm:ss"),
              availableToTime: availability.to.format("HH:mm:ss"),
            }}
            onSuccess={() => setIsUpsertDoctorDialogOpen(false)}
          />
        </Dialog>
        {doctor && (
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button variant="outline" className="w-full hover:cursor-pointer">
                <TrashIcon />
                Deletar médico
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>
                  Tem certeza que deseja deletar este médico?
                </AlertDialogTitle>
                <AlertDialogDescription>
                  Essa ação não pode ser revertida. Isso irá deletar o médico e
                  todas as consultas agendadas.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel className="hover: cursor-pointer">
                  Cancelar
                </AlertDialogCancel>
                <AlertDialogAction
                  className="text-destructive bg-background border border-red-500 hover:cursor-pointer hover:bg-red-50"
                  onClick={handleDeleteDoctorClick}
                >
                  <TrashIcon />
                  Deletar
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        )}
      </CardFooter>
    </Card>
  );
};

export default DoctorCard;
