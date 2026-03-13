'use client';

import { ReactNode } from 'react';

const WEEKDAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]

interface Props {
  data?: unknown;
  children?: ReactNode;
}

export function CalendarContent(props: Props) {
  return (
    <div className="flex h-full flex-col">
      {/* Weekday headers */}
      <div className="grid grid-cols-7 border-b bg-muted/50">
        {WEEKDAYS.map((day) => (
          <div
            key={day}
            className="px-1 py-2 text-center text-xs font-medium text-muted-foreground"
          >
            {day}
          </div>
        ))}
      </div>
    </div>
  );
}

export default CalendarContent;
