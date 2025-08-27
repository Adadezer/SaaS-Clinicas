"use server";

import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import { revalidatePath } from "next/cache";
import { headers } from "next/headers";

import { db } from "@/db";
import { doctorsAvailabilitiesTable } from "@/db/schema";
import { auth } from "@/lib/auth";
import { actionClient } from "@/lib/next-safe-action";

import { insertDoctorAvailabilitySchema } from "./schema";

dayjs.extend(utc);

export const insertDoctorAvailability = actionClient
  .schema(insertDoctorAvailabilitySchema)
  .action(async ({ parsedInput }) => {
    //parsedInput são os dados validados pelo schema, esses dados são os dados do formulário de adicionar ou editar médico

    const fromTime = parsedInput.fromTime;
    const toTime = parsedInput.toTime;

    const fromTimeUTC = dayjs()
      .set("hour", parseInt(fromTime.split(":")[0]))
      .set("minute", parseInt(fromTime.split(":")[1]))
      .set("second", parseInt(fromTime.split(":")[2]))
      .utc();

    const toTimeUTC = dayjs()
      .set("hour", parseInt(toTime.split(":")[0]))
      .set("minute", parseInt(toTime.split(":")[1]))
      .set("second", parseInt(toTime.split(":")[2]))
      .utc();

    const session = await auth.api.getSession({
      headers: await headers(),
    });
    if (!session?.user) {
      throw new Error("Usuário não autorizado");
    }

    await db
      .insert(doctorsAvailabilitiesTable)
      .values({
        ...parsedInput,
        fromTime: fromTimeUTC.format("HH:mm:ss"),
        toTime: toTimeUTC.format("HH:mm:ss"),
      })
      .onConflictDoUpdate({
        target: [doctorsAvailabilitiesTable.id],
        set: {
          ...parsedInput,
          fromTime: fromTimeUTC.format("HH:mm:ss"),
          toTime: toTimeUTC.format("HH:mm:ss"),
        },
      });
    revalidatePath("/doctors");
  });
