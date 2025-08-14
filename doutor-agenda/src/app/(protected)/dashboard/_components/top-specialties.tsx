import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { SpecialtyIcons } from "@/helpers/specialty-icon";
import { Hospital } from "lucide-react";

interface TopSpecialtiesProps {
  topSpecialties: {
    specialty: string;
    appointments: number;
  }[];
}

export default function TopSpecialties({
  topSpecialties,
}: TopSpecialtiesProps) {
  // examina o numero de agendamentos da especialidade, pega o maior numero e coloca ele como máximo
  // isso é usado para calcular a barra de progresso, mostrando o progresso de cada especialidade
  const maxAppointments = Math.max(
    ...topSpecialties.map((i) => i.appointments),
    0, // evita erro caso array esteja vazio
  );

  return (
    <Card className="col-span-12 md:col-span-3">
      <CardContent>
        <div className="mb-8 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Hospital className="text-muted-foreground" />
            <CardTitle className="text-base">Especialidades</CardTitle>
          </div>
        </div>

        {/* specialties List */}
        <div className="space-y-6">
          {topSpecialties.map((item) => {
            const Icon = SpecialtyIcons(item.specialty);
            const progressValue = (item.appointments / maxAppointments) * 100;

            return (
              <div key={item.specialty} className="flex items-center gap-2">
                <div className="bg-primary/10 flex h-10 w-10 items-center justify-center rounded-full">
                  <Icon className="text-primary h-5 w-5" />
                </div>
                <div className="flex w-full flex-col justify-center">
                  <div className="flex w-full justify-between">
                    <h3 className="text-sm">{item.specialty}</h3>
                    <div className="text-right">
                      <span className="text-muted-foreground text-sm font-medium">
                        {item.appointments} agend.
                      </span>
                    </div>
                  </div>
                  <Progress value={progressValue} className="w-full" />
                </div>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}
