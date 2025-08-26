import { SearchX } from "lucide-react";

import { Button } from "@/components/ui/button";
import { doctorsTable } from "@/db/schema";

interface ClearFilterDoctorButtonProps {
  searchDoctor?: string;
  setSearchDoctor?: (search: string) => void;
  setDoctors: (patients: (typeof doctorsTable.$inferSelect)[]) => void;
  initialDoctors: (typeof doctorsTable.$inferSelect)[];
}

const ClearFilterDoctorButton = ({
  searchDoctor,
  setSearchDoctor,
  setDoctors,
  initialDoctors,
}: ClearFilterDoctorButtonProps) => {
  const handleClearDoctor = () => {
    if (setSearchDoctor) setSearchDoctor("");
    setDoctors(initialDoctors);
  };

  return (
    searchDoctor && (
      <Button
        type="button"
        variant="ghost"
        onClick={handleClearDoctor}
        className="hover:text-primary absolute top-1/2 right-2 -translate-y-1/2 text-gray-500 hover:cursor-pointer hover:bg-transparent"
      >
        <SearchX size={16} />
      </Button>
    )
  );
};

export default ClearFilterDoctorButton;
