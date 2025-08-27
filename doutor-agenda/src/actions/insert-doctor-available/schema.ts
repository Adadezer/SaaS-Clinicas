import { z } from "zod";

export const insertDoctorAvailabilitySchema = z
  .object({
    id: z.string().uuid().optional(),
    doctorId: z.string().uuid(),
    fromWeekDay: z.number().min(0).max(6),
    toWeekDay: z.number().min(0).max(6),
    fromTime: z.string().min(1, {
      message: "Hora de início é obrigatória.",
    }),
    toTime: z.string().min(1, {
      message: "Hora de término é obrigatória.",
    }),
  })
  .refine(
    (data) => {
      return data.fromTime < data.toTime;
    },
    {
      message:
        "O horário de início não pode ser anterior ao horário de término.",
      path: ["toTime"],
    },
  );

export type UpsertDoctorSchema = z.infer<typeof insertDoctorAvailabilitySchema>;
