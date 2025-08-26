import { SearchX } from "lucide-react";
import React from "react";

import { Button } from "@/components/ui/button";
import { patientsTable } from "@/db/schema";

interface ClearFilterPatientButtonProps {
  search?: string;
  setSearchPatient?: (search: string) => void;
  setPatients: (patients: (typeof patientsTable.$inferSelect)[]) => void;
  initialPatients: (typeof patientsTable.$inferSelect)[];
}

const ClearFilterPatientButton = ({
  search,
  setSearchPatient,
  setPatients,
  initialPatients,
}: ClearFilterPatientButtonProps) => {
  const handleClear = () => {
    if (setSearchPatient) setSearchPatient("");
    setPatients(initialPatients);
  };

  return (
    search && (
      <Button
        type="button"
        variant="ghost"
        onClick={handleClear}
        className="hover:text-primary absolute top-1/2 right-2 -translate-y-1/2 text-gray-500 hover:cursor-pointer hover:bg-transparent"
      >
        <SearchX size={16} />
      </Button>
    )
  );
};

export default ClearFilterPatientButton;
