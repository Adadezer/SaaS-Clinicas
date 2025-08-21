import { DataTable } from "@/components/ui/data-table";
import { db } from "@/db";
import { appointmentsTable } from "@/db/schema";
import { eq } from "drizzle-orm";
import React from "react";
import { appointmentsTableColumns } from "../../appointments/_components/table-columns";

interface PatientHistoryProps {
  patientId: string;
}

const PatientHistory = async ({ patientId }: PatientHistoryProps) => {
  const appointments = await db.query.appointmentsTable.findMany({
    where: eq(appointmentsTable.patientId, patientId),
    with: {
      patient: true,
      doctor: true,
    },
  });

  return <DataTable columns={appointmentsTableColumns} data={appointments} />;
};

export default PatientHistory;
