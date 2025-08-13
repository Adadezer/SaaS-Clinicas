import dayjs from "dayjs";
import { and, count, desc, eq, gte, lte, sql, sum } from "drizzle-orm";

import { db } from "@/db";
import { appointmentsTable, doctorsTable, patientsTable } from "@/db/schema";

interface Params {
  from: string;
  to: string;
  session: {
    user: {
      clinic: {
        id: string;
      };
    };
  };
}

export const getDashboard = async ({ from, to, session }: Params) => {
  const chartStartDate = dayjs().subtract(10, "days").startOf("day").toDate();
  const chartEndDate = dayjs().add(10, "days").endOf("day").toDate();
  const [
    [totalRevenue],
    [totalAppointments],
    [totalPatients],
    [totalDoctors],
    topDoctors,
    topSpecialties,
    todayAppointments,
    dailyAppointmentsData,
  ] = await Promise.all([
    db
      .select({
        total: sum(appointmentsTable.appointmentPriceInCents),
      })
      .from(appointmentsTable)
      .where(
        and(
          eq(appointmentsTable.clinicId, session.user.clinic.id),
          gte(appointmentsTable.date, new Date(from)),
          lte(appointmentsTable.date, new Date(to)),
        ),
      ),

    db
      .select({
        total: count(),
      })
      .from(appointmentsTable)
      .where(
        and(
          eq(appointmentsTable.clinicId, session.user.clinic.id),
          gte(appointmentsTable.date, new Date(from)),
          lte(appointmentsTable.date, new Date(to)),
        ),
      ),

    db
      .select({
        total: count(),
      })
      .from(patientsTable)
      .where(eq(patientsTable.clinicId, session.user.clinic.id)),

    db
      .select({
        total: count(),
      })
      .from(doctorsTable)
      .where(eq(doctorsTable.clinicId, session.user.clinic.id)),

    db
      .select({
        id: doctorsTable.id,
        name: doctorsTable.name,
        lastName: doctorsTable.lastName,
        sex: doctorsTable.sex,
        avatarImageUrl: doctorsTable.avatarImageUrl,
        specialty: doctorsTable.specialty,
        appointments: count(appointmentsTable.id),
      })
      .from(doctorsTable)
      .leftJoin(
        appointmentsTable,
        and(
          eq(appointmentsTable.doctorId, doctorsTable.id),
          gte(appointmentsTable.date, new Date(from)),
          lte(appointmentsTable.date, new Date(to)),
        ),
      )
      .where(eq(doctorsTable.clinicId, session.user.clinic.id))
      .groupBy(doctorsTable.id)
      .orderBy(desc(count(appointmentsTable.id)))
      .limit(10),

    db
      .select({
        specialty: doctorsTable.specialty, // pega a especialidade de cada médico.
        appointments: count(appointmentsTable.id), // conta o número de agendamentos de cada especialidade
      })
      .from(appointmentsTable)
      // Liga a tabela de agendamentos (appointmentsTable) com a tabela de médicos (doctorsTable) usando doctorId.
      // O INNER JOIN garante que só vai retornar agendamentos que têm um médico correspondente.
      .innerJoin(doctorsTable, eq(appointmentsTable.doctorId, doctorsTable.id))
      .where(
        and(
          eq(appointmentsTable.clinicId, session.user.clinic.id),
          gte(appointmentsTable.date, new Date(from)),
          lte(appointmentsTable.date, new Date(to)),
        ),
      )
      // Agrupa os resultados por especialidade, para que cada especialidade seja uma linha na tabela final.
      // Usa o count para contar quantos agendamentos existem para cada especialidade.
      .groupBy(doctorsTable.specialty)
      // Ordena as especialidades pela quantidade de agendamentos em ordem decrescente. O mais agendado vem primeiro.
      .orderBy(desc(count(appointmentsTable.id))),

    db.query.appointmentsTable.findMany({
      where: and(
        eq(appointmentsTable.clinicId, session.user.clinic.id),
        gte(appointmentsTable.date, dayjs().startOf("day").toDate()),
        lte(appointmentsTable.date, dayjs().endOf("day").toDate()),
      ),
      with: {
        patient: true,
        doctor: true,
      },
    }),

    db
      .select({
        date: sql<string>`DATE(${appointmentsTable.date})`.as("date"), // transforma os dados do tipo Date para string
        appointments: count(appointmentsTable.id), // conta o número de agendamentos
        revenue:
          sql<number>`COALESCE(SUM(${appointmentsTable.appointmentPriceInCents}), 0)`.as(
            // soma os valores dos agendamentos
            "revenue",
          ),
      })
      .from(appointmentsTable)
      .where(
        // pega os dados de um range (dia inicial, dia final)
        and(
          eq(appointmentsTable.clinicId, session.user.clinic.id),
          gte(appointmentsTable.date, chartStartDate),
          lte(appointmentsTable.date, chartEndDate),
        ),
      )
      .groupBy(sql`DATE(${appointmentsTable.date})`)
      .orderBy(sql`DATE(${appointmentsTable.date})`),
  ]);
  return {
    totalRevenue,
    totalAppointments,
    totalPatients,
    totalDoctors,
    topDoctors,
    topSpecialties,
    todayAppointments,
    dailyAppointmentsData,
  };
};
