"use client";

import { useState } from "react";

import { getPatientByNameAction } from "@/actions/filter-patient";
import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/ui/data-table";
import { Input } from "@/components/ui/input";
import { patientsTable } from "@/db/schema";

import ClearFilterPatientButton from "./clear-filter-patient-button";
import { patientTableColumns } from "./table-columns";

interface FilterPatientProps {
  initialPatients: (typeof patientsTable.$inferSelect)[];
  clinicId: string;
}

const FilterPatient = ({ initialPatients, clinicId }: FilterPatientProps) => {
  const [patients, setPatients] = useState(initialPatients);
  const [searchPatient, setSearchPatient] = useState("");

  const handleFilterPatient = async () => {
    if (!searchPatient) {
      setPatients(initialPatients);
      return;
    }

    const results = await getPatientByNameAction(searchPatient, clinicId);
    setPatients(results);
  };

  return (
    <div className="space-y-4">
      <div className="flex gap-2">
        <div className="relative max-w-60 flex-1">
          <Input
            placeholder="Buscar paciente"
            value={searchPatient}
            onChange={(e) => setSearchPatient(e.target.value)}
            className="pr-10"
          />
          <ClearFilterPatientButton
            search={searchPatient}
            setSearchPatient={setSearchPatient}
            setPatients={setPatients}
            initialPatients={initialPatients}
          />
        </div>
        <Button onClick={handleFilterPatient}>Filtrar</Button>
      </div>
      <DataTable data={patients} columns={patientTableColumns} />
    </div>
  );
};

export default FilterPatient;
