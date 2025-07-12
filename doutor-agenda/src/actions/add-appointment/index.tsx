/* Os agendamentos não terão a opção de editar, apenas adicionar e excluir,
(assim como é nos hospitais e Upa's, podendo apenas marcar e remarcar consultas para outro dia.)

TO DO: Se desejar colocar uma opção de edidar agendamentos, mudar nome das funções para upsert, e fazer ajustes devidos no código */

"use server";

import dayjs from "dayjs";
import { revalidatePath } from "next/cache";
import { headers } from "next/headers";

import { db } from "@/db";
import { appointmentsTable } from "@/db/schema";
import { auth } from "@/lib/auth";
import { actionClient } from "@/lib/next-safe-action";

import { addAppointmentSchema } from "./schema";

export const addAppointment = actionClient
  .schema(addAppointmentSchema)
  .action(async ({ parsedInput }) => {
    const session = await auth.api.getSession({
      headers: await headers(),
    });

    if (!session?.user) {
      throw new Error("Usuário não autorizado");
    }

    if (!session?.user.clinic?.id) {
      throw new Error("Clinica não encontrada");
    }

    const appointmentDateTime = dayjs(parsedInput.date)
      .set("hour", parseInt(parsedInput.time.split(":")[0]))
      .set("minute", parseInt(parsedInput.time.split(":")[1]))
      .toDate();

    await db.insert(appointmentsTable).values({
      ...parsedInput,
      clinicId: session?.user.clinic?.id,
      date: appointmentDateTime,
    });

    /* 
      Caso upsert:
      
      await db
      .insert(appointmentsTable)
      .values({
        ...parsedInput,
        id: parsedInput.id,
        clinicId: session?.user.clinic?.id,
        date: appointmentDateTime,
      })
      .onConflictDoUpdate({
        target: [appointmentsTable.id],
        set: {
          ...parsedInput,
          date: appointmentDateTime,
        },
      }); */

    revalidatePath("/appointments");
  });
