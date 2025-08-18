import { Calendar } from "lucide-react";
import React from "react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DataTable } from "@/components/ui/data-table";

import { appointmentsTableColumns } from "../../appointments/_components/table-columns";

interface TodayAppointmentsTableProps {
  todayAppointments: {
    date: Date;
    id: string;
    appointmentPriceInCents: number;
    createdAt: Date;
    updatedAt: Date | null;
    clinicId: string;
    patientId: string;
    doctorId: string;
    patient: {
      id: string;
      name: string;
      createdAt: Date;
      updatedAt: Date | null;
      clinicId: string;
      lastName: string;
      email: string;
      phoneNumber: string;
      sex: "male" | "female";
    };
    doctor: {
      id: string;
      name: string;
      appointmentPriceInCents: number;
      createdAt: Date;
      updatedAt: Date | null;
      clinicId: string;
      lastName: string;
      sex: "male" | "female";
      avatarImageUrl: string | null;
      availableFromWeekDay: number;
      availableToWeekDay: number;
      availableFromTime: string;
      availableToTime: string;
      specialty: string;
    };
  }[];
}

const TodayAppointmentsTable = ({
  todayAppointments,
}: TodayAppointmentsTableProps) => {
  return (
    <Card>
      <CardHeader>
        <div className="flex items-center gap-3">
          <Calendar className="text-muted-foreground" />
          <CardTitle className="text-base">Agendamentos de hoje</CardTitle>
        </div>
      </CardHeader>
      <CardContent>
        <DataTable
          columns={appointmentsTableColumns}
          data={todayAppointments}
        />
      </CardContent>
    </Card>
  );
};

export default TodayAppointmentsTable;
