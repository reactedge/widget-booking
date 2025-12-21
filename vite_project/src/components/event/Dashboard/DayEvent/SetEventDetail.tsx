import {useConfigState} from "../../../../state/Config/useConfigState.ts";
import type {DayGroupEvent} from "../../../../types/domain/dashboard.type.tsx";
import {useEventState} from "../../../../state/Event/useEventState.ts";
import {AVAILABLE, BOOKED_EVENT} from "../../../../types/domain/event.type.ts";
import {getTime} from "../../../../lib/date.ts";
import {groupEventStatus} from "../../../../lib/group-event.ts";
import {tr} from "../../../../lib/translate.ts";

interface EventProps {
    eventGroup: DayGroupEvent
}

export const SetEventDetail: React.FC<EventProps> = ({ eventGroup }) => {
    const { resetActiveEvent } = useEventState();
    const { config } = useConfigState();

    const viewDetail = (e: React.FormEvent) => {
        e.preventDefault();
        resetActiveEvent();
        // router.push({
        //     pathname: `/set-event-detail/${encodeURIComponent(
        //         JSON.stringify(eventGroup.eventIds)
        //     )}`,
        // });
    };

    const status = groupEventStatus(eventGroup);

    return (
        <div
            /*status={status}*/
            className="event-detail"
        >
            <div className="event-detail-state event-detail-state--past">
                <p>Done!</p>
            </div>

            <div className="event-detail-state event-detail-state--in-cart">
                <p>{tr("In Cart!", config.venue.id)}</p>
            </div>

            <div className="event-detail-state event-detail-state--ordered">
                <p>Booked!</p>
            </div>

            {status === AVAILABLE && (
                <button
                    type="button"
                    className="event-detail-action event-detail-action--view"
                    onClick={viewDetail}
                >
                    View
                </button>
            )}

            {status === BOOKED_EVENT && (
                <span className="event-detail-timestamp">
                    Finishing at{" "}
                    {getTime(eventGroup?.cartEvent?.endTime || "")}
                </span>
            )}
        </div>
    );
};
