"use client";

import { CheckCircle2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

interface PremiumPlanProps {
  className?: string;
}

export function PremiumPlan({ className }: PremiumPlanProps) {
  const features = [
    "Agendamentos ilimitados",
    "Cadastro de pacientes",
    "Cadastro ilimitado de médicos",
    "Métricas avançadas e relatórios completos",
    "Confirmação automática e lembretes WhatsApp/SMS",
    "Suporte via chat, e-mail, telefone e prioridade",
    "Exportação de relatórios (PDF/Excel)",
    "Integração com convênios",
  ];

  return (
    <Card className={className}>
      <CardHeader>
        <div className="flex items-center justify-between">
          <h3 className="text-2xl font-bold text-gray-900">Premium</h3>
        </div>
        <p className="text-gray-600">
          Ideal para médias e grandes clínicas que precisam de gestão completa.
        </p>
        <div className="flex items-baseline">
          <span className="text-3xl font-bold text-gray-900">R$159</span>
          <span className="ml-1 text-gray-600">/ mês</span>
        </div>
      </CardHeader>

      <CardContent>
        <div className="space-y-4 border-t border-gray-200 pt-6">
          {features.map((feature, index) => (
            <div key={index} className="flex items-start">
              <div className="flex-shrink-0">
                <CheckCircle2 className="h-5 w-5 text-green-500" />
              </div>
              <p className="ml-3 text-gray-600">{feature}</p>
            </div>
          ))}
        </div>

        <div className="mt-8">
          <Button className="w-full" variant="outline">
            Fazer assinatura
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
