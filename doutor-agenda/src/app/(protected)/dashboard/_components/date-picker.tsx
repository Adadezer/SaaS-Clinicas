"use client";

import { addMonths, format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { Calendar as CalendarIcon } from "lucide-react";
import { parseAsIsoDate, useQueryState } from "nuqs";
import { useState } from "react";
import { DateRange } from "react-day-picker";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";

export function DatePicker({
  className,
}: React.HTMLAttributes<HTMLDivElement>) {
  const [from, setFrom] = useQueryState(
    "from",
    parseAsIsoDate.withDefault(new Date()),
  );
  const [to, setTo] = useQueryState(
    "to",
    parseAsIsoDate.withDefault(addMonths(new Date(), 1)),
  );

  const [openDatePicker, setOpenDatePicker] = useState(false);
  const [temporaryRange, setTemporaryRange] = useState<DateRange | undefined>({
    from,
    to,
  });

  const handleDateSelect = (range: DateRange | undefined) => {
    setTemporaryRange(range);
  };

  const handleApply = () => {
    if (temporaryRange?.from) setFrom(temporaryRange.from);
    if (temporaryRange?.to) setTo(temporaryRange.to);
    setOpenDatePicker(false);
  };

  return (
    <div className={cn("grid gap-2", className)}>
      <Popover open={openDatePicker} onOpenChange={setOpenDatePicker}>
        <PopoverTrigger asChild>
          <Button
            id="date"
            variant={"outline"}
            className={cn(
              "justify-start text-left font-normal",
              !from && "text-muted-foreground",
            )}
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            {from ? (
              to ? (
                <>
                  {format(from, "LLL dd, y", { locale: ptBR })} -{" "}
                  {format(to, "LLL dd, y", { locale: ptBR })}
                </>
              ) : (
                format(from, "LLL dd, y", { locale: ptBR })
              )
            ) : (
              <span>Selecione uma data</span>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <div className="flex flex-col gap-2 p-2">
            <Calendar
              initialFocus
              mode="range"
              defaultMonth={from}
              selected={temporaryRange}
              onSelect={handleDateSelect}
              numberOfMonths={2}
              locale={ptBR}
            />
            <div className="flex gap-2 p-2">
              <Button
                onClick={handleApply}
                className="flex-1"
                disabled={!temporaryRange?.from || !temporaryRange?.to}
              >
                Concluído
              </Button>
              <Button
                variant="outline"
                onClick={() => setOpenDatePicker(false)}
                className="flex-1"
              >
                Cancelar
              </Button>
            </div>
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
}
