"use client";

import {
  Calendar,
  CalendarCell,
  CalendarGrid,
  CalendarGridBody,
  CalendarGridHeader,
  CalendarHeader,
  CalendarHeading,
  NavButton,
} from "@/components/tailgrids/core/calendar";
import { DateInput, DateSegment } from "@/components/tailgrids/core/date-field";
import {
  DatePicker,
  DatePickerGroup,
  DatePickerPopover,
  DatePickerTrigger,
} from "@/components/tailgrids/core/date-picker";
import { FieldLabel } from "@/components/tailgrids/core/field";
import { TimeField } from "@/components/tailgrids/core/time-field";
import { CalendarDate, Time } from "@internationalized/date";
import { Calendar as CalendarIcon, ClockThree as ClockIcon } from "@tailgrids/icons";
import { useState } from "react";

export default function TimeAndDate() {
  const [timeValue, setTimeValue] = useState<Time | null>(new Time(12, 0));
  const [dateValue, setDateValue] = useState<CalendarDate | null>(new CalendarDate(2028, 8, 18));

  return (
    <div className="flex flex-col gap-5 p-6">
      {/* Time Field */}
      <TimeField value={timeValue} onChange={setTimeValue}>
        <FieldLabel className="mb-1.5 block text-sm font-medium text-text-secondary">
          Select time
        </FieldLabel>
        <div className="relative w-full">
          <DateInput className="w-full pr-11">
            {(segment) => <DateSegment segment={segment} />}
          </DateInput>
          <div className="pointer-events-none absolute top-1/2 right-4 -translate-y-1/2 text-text-secondary">
            <ClockIcon className="size-5" />
          </div>
        </div>
      </TimeField>

      {/* Date Field */}
      <DatePicker value={dateValue} onChange={setDateValue}>
        <FieldLabel className="mb-1.5 block text-sm font-medium text-text-secondary">
          Select Date
        </FieldLabel>
        <DatePickerGroup className="relative w-full">
          <DateInput className="w-full pr-4 pl-11">
            {(segment) => <DateSegment segment={segment} />}
          </DateInput>
          <DatePickerTrigger className="absolute top-1/2 right-auto left-4 -translate-y-1/2 text-text-secondary hover:text-text-primary focus:outline-none">
            <CalendarIcon className="size-5" />
          </DatePickerTrigger>
        </DatePickerGroup>

        <DatePickerPopover>
          <Calendar>
            <CalendarHeader>
              <NavButton slot="previous" />
              <CalendarHeading />
              <NavButton slot="next" />
            </CalendarHeader>
            <CalendarGrid>
              <CalendarGridHeader />
              <CalendarGridBody>{(date) => <CalendarCell date={date} />}</CalendarGridBody>
            </CalendarGrid>
          </Calendar>
        </DatePickerPopover>
      </DatePicker>
    </div>
  );
}
