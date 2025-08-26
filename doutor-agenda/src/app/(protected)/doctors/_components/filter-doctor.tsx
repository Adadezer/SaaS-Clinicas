"use client";

import { Stethoscope } from "lucide-react";
import React, { useState } from "react";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { doctorsTable } from "@/db/schema";

import ClearFilterDoctorButton from "./clear-filter-doctor-button";
import DoctorCard from "./doctor-card";

interface FilterDoctorProps {
  initialDoctors: (typeof doctorsTable.$inferSelect)[];
}
const FilterDoctor = ({ initialDoctors }: FilterDoctorProps) => {
  const [doctors, setDoctors] = useState(initialDoctors);
  const [searchDoctor, setSearchDoctor] = useState("");

  const handleFilterDoctor = () => {
    if (!searchDoctor) {
      setDoctors(initialDoctors);
      return;
    }

    const filteredDoctors = doctors.filter(
      (doctor) =>
        doctor.name.toLowerCase().includes(searchDoctor.toLowerCase()) ||
        doctor.specialty.toLowerCase().includes(searchDoctor.toLowerCase()),
    );

    setDoctors(filteredDoctors);
  };

  return (
    <div className="space-y-4">
      <div className="flex gap-2">
        <div className="relative max-w-64 flex-1">
          <Input
            placeholder="Buscar médico ou especialidade"
            value={searchDoctor}
            onChange={(e) => setSearchDoctor(e.target.value)}
            className="pr-10"
          />
          <ClearFilterDoctorButton
            searchDoctor={searchDoctor}
            setSearchDoctor={setSearchDoctor}
            setDoctors={setDoctors}
            initialDoctors={initialDoctors}
          />
        </div>
        <Button onClick={handleFilterDoctor}>Buscar</Button>
      </div>
      <div className="grid grid-cols-[repeat(auto-fit,minmax(300px,1fr))] gap-6">
        {doctors.length > 0 ? (
          doctors.map((doctor) => (
            <div key={doctor.id} className="max-w-md">
              <DoctorCard doctor={doctor} />
            </div>
          ))
        ) : (
          <Card>
            <div className="flex items-center justify-center gap-2">
              <p>Nenhum resultado encontrado</p>
              <Stethoscope className="text-primary h-4 w-4" />
            </div>
          </Card>
        )}
      </div>
    </div>
  );
};

export default FilterDoctor;
