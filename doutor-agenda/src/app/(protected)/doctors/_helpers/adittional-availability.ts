import "dayjs/locale/pt-br";

import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";

dayjs.extend(utc);
dayjs.locale("pt-br");

interface getAdditionalAvailabilityProps {
  fromWeekDay: number;
  fromTime: string;
  toWeekDay: number;
  toTime: string;
}

export const getAdditionalAvailability = (
  availability: getAdditionalAvailabilityProps,
) => {
  const from = dayjs()
    .utc()
    .day(availability.fromWeekDay)
    .set("hour", Number(availability.fromTime.split(":")[0]))
    .set("minute", Number(availability.fromTime.split(":")[1]))
    .set("second", Number(availability.fromTime.split(":")[2] || 0))
    .local();

  const to = dayjs()
    .utc()
    .day(availability.toWeekDay)
    .set("hour", Number(availability.toTime.split(":")[0]))
    .set("minute", Number(availability.toTime.split(":")[1]))
    .set("second", Number(availability.toTime.split(":")[2] || 0))
    .local();

  return { from, to };
};
