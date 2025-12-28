import {useVisitIntentState} from "../../../state/Intent/useVisitIntentState.ts";
import {getWeeks} from "../../../lib/date.ts";
import {FilterSection} from "../FilterSection.tsx";
import {WeekOptions} from "./WeekFilter/WeekOptions.tsx";

export function WeekFilter({ weekSpan }: { weekSpan: number }) {
    const { visitIntent, setWeekIntent } = useVisitIntentState();

    function formatWeekLabel(intent: string | null, weekSpan: number): string {
        if (!intent) return "";

        const week = getWeeks(weekSpan).find(
            (week) => week.weekStart === intent
        );

        return week ? week.weekLabel : "";
    }

    if (!visitIntent.eventTypeId) return null;

    return (
        <FilterSection
            title="Week"
            isResolved={!!visitIntent.weekIntent}
            summary={formatWeekLabel(visitIntent.weekIntent, weekSpan)}
            onEdit={() => setWeekIntent('')}
        >
            <WeekOptions weekSpan={weekSpan} />
        </FilterSection>
    )

    /*return (
        <div className="booking-row booking-filter--week">
            <h3>Week</h3>

            <div
                className="booking-options booking-options--week"
                role="group"
                aria-label="Preferred week"
            >
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
        </div>
    );*/
}
