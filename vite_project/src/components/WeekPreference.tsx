
import {getWeeks} from "../lib/date.ts";

export interface WeekPreferenceProps {
    value?: string;
    onSelect: (weekStart: string) => void;
}

export function WeekPreference({
   value,
   onSelect,
}: WeekPreferenceProps) {
    const scheduleWeekSpan = 4;

    return (
        <div
            className="booking-options booking-options--week"
            role="group"
            aria-label="Preferred week"
        >
            {getWeeks(scheduleWeekSpan).map((option) => {
                const isActive = value === option.weekStart;

                return (
                    <button
                        key={option.weekStart}
                        type="button"
                        className={`booking-option ${isActive ? "is-active" : ""}`}
                        aria-pressed={isActive}
                        onClick={() => onSelect(option.weekStart)}
                    >
                        <span className="booking-option-label">
                          {option.weekLabel}
                        </span>
                    </button>
                );
            })}
        </div>
    );
}