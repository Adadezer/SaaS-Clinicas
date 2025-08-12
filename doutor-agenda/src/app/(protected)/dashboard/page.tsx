import { headers } from "next/headers";
import { redirect } from "next/navigation";
import React from "react";

import { auth } from "@/lib/auth";

import {
  PageActions,
  PageContainer,
  PageContent,
  PageDescription,
  PageHeader,
  PageHeaderContent,
  PageTitle,
} from "@/components/ui/page-container";
import { DatePicker } from "./_components/date-picker";
import { appointmentsTable, doctorsTable, patientsTable } from "@/db/schema";
import { db } from "@/db";
import { and, count, desc, eq, gte, lte, sql, sum } from "drizzle-orm";
import StatsCards from "./_components/stats-cards";
import dayjs from "dayjs";
import AppointmentsChart from "./_components/appointments-chart";
import TopDoctors from "./_components/top-doctors";
import TopSpecialties from "./_components/top-specialties";

interface DashboardPageProps {
  searchParams: {
    from?: string;
    to?: string;
  };
}

async function DashboardPage({ searchParams }: DashboardPageProps) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session?.user) {
    redirect("/authentication");
  }

  if (!session?.user?.clinic) {
    redirect("/clinic-form");
  }

  const { from, to } = searchParams;

  if (!from || !to) {
    redirect(
      `/dashboard?from=${dayjs().format("YYYY-MM-DD")}&to=${dayjs().add(1, "month").format("YYYY-MM-DD")}`,
    );
  }

  const [
    [totalRevenue],
    [totalAppointments],
    [totalPatients],
    [totalDoctors],
    topDoctors,
    topSpecialties,
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
      .orderBy(desc(count(appointmentsTable.id))), //
  ]);

  const chartStartDate = dayjs().subtract(30, "days").startOf("day").toDate();
  const chartEndDate = dayjs().add(30, "days").endOf("day").toDate();

  const dailyAppointmentsData = await db
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
    .orderBy(sql`DATE(${appointmentsTable.date})`);

  return (
    <PageContainer>
      <PageHeader>
        <PageHeaderContent>
          <PageTitle>Dashboard</PageTitle>
          <PageDescription>
            Acesse uma visão geral detalhada das principais métricas e
            resultados dos pacientes
          </PageDescription>
        </PageHeaderContent>
        <PageActions>
          <DatePicker />
        </PageActions>
      </PageHeader>
      <PageContent>
        <StatsCards
          totalRevenue={totalRevenue.total ? Number(totalRevenue.total) : null}
          totalAppointments={totalAppointments.total}
          totalPatients={totalPatients.total}
          totalDoctors={totalDoctors.total}
        />
      </PageContent>
      <div className="grid grid-cols-[2.25fr_1fr] gap-4">
        <AppointmentsChart dailyAppointmentsData={dailyAppointmentsData} />
        <TopDoctors doctors={topDoctors} />
      </div>
      <div className="grid grid-cols-[2.25fr_1fr] gap-4">
        {/* Tabela */}
        <TopSpecialties topSpecialties={topSpecialties} />
      </div>
    </PageContainer>
  );
}

export default DashboardPage;
