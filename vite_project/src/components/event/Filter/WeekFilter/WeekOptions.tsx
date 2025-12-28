import {getWeeks} from "../../../../lib/date.ts";
import {useVisitIntentState} from "../../../../state/Intent/useVisitIntentState.ts";

type WeekOptionsProps = {
    weekSpan: number
};

export function WeekOptions({ weekSpan }: WeekOptionsProps) {
    const { visitIntent, setWeekIntent } = useVisitIntentState();

    return (
        <div className="booking-options" role="group" aria-label="Week selection">
            {getWeeks(weekSpan).map((week) => {
                const isActive = visitIntent.weekIntent === week.weekStart;

                return (
                    <button
                        key={week.weekStart}
                        type="button"
                        className={`booking-option ${isActive ? "is-active" : ""}`}
                        aria-pressed={isActive}
                        onClick={() => setWeekIntent(week.weekStart)}
                    >
                            <span className="booking-option-label">
                              {week.weekLabel}
                            </span>
                    </button>
                );
            })}
        </div>
    );
}
