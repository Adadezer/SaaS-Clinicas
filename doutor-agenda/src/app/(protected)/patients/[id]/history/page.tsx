import { eq } from "drizzle-orm";
import { ChevronLeft } from "lucide-react";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { db } from "@/db";
import { patientsTable } from "@/db/schema";

import PatientHistory from "../../_components/patient-history";
import { id } from "date-fns/locale";

interface PatientHystoryPage {
  params: Promise<{ id: string }>;
}

const PatientHystoryPage = async ({ params }: PatientHystoryPage) => {
  const { id } = await params;
  const patient = await db.query.patientsTable.findFirst({
    where: eq(patientsTable.id, id),
  });

  if (!patient) {
    return <div>Paciente não encontrado</div>;
  }

  return (
    <div className="space-y-6 p-6">
      <div className="flex justify-between">
        <h1 className="text-2xl font-bold">
          Histórico de consultas d{patient.sex === "male" ? "o" : "a"}{" "}
          {patient.name}
        </h1>
        <Button asChild>
          <Link href="/patients" className="flex items-center gap-2">
            <ChevronLeft className="h-4 w-4" />
            Voltar
          </Link>
        </Button>
      </div>

      <PatientHistory patientId={id} />
    </div>
  );
};

export default PatientHystoryPage;
