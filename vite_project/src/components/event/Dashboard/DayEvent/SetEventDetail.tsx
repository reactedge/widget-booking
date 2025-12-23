import type {DayGroupEvent} from "../../../../types/domain/dashboard.type.tsx";
import {useEventState} from "../../../../state/Event/useEventState.ts";
import {AVAILABLE, IN_CART_EVENT, PAST_EVENT, PURCHASED_EVENT} from "../../../../types/domain/event.type.ts";
import {getTime} from "../../../../lib/date.ts";
import {groupEventStatus} from "../../../../lib/group-event.ts";
import {useVenueTranslation} from "../../../../hooks/ui/useVenueTranslation.ts";

interface EventProps {
    eventGroup: DayGroupEvent;
    onView: (eventIds: string[]) => void;
}

export const SetEventDetail: React.FC<EventProps> = ({ eventGroup, onView }) => {
    const { resetActiveEvent } = useEventState();
    const t = useVenueTranslation();

    const status = groupEventStatus(eventGroup);

    const viewDetail = (e: React.FormEvent) => {
        e.preventDefault();
        resetActiveEvent();
        onView(eventGroup.eventIds);
    };

    return (
        <div className={`event-detail event-detail--${status}`}>
            {status === PAST_EVENT && (
                <div className="event-detail-state event-detail-state--past">
                    <p>Done!</p>
                </div>
            )}

            {status === IN_CART_EVENT && (
                <>
                    <div className="event-detail-state event-detail-state--in-cart">
                        <p>{t("In Cart!")}</p>
                    </div>
                    <div className="event-detail-state event-detail-state--ordered">
                        <p>Booked!</p>
                        <span className="event-detail-timestamp">Finishing at {getTime(eventGroup.cartEvent?.end || "")}
                        </span>
                    </div>
                </>
            )}

            {status === PURCHASED_EVENT && (
                <>
                    <div className="event-detail-state event-detail-state--ordered">
                        <p>Purchased!</p>
                        <span className="event-detail-timestamp">Finishing at {getTime(eventGroup.cartEvent?.end || "")}
                        </span>
                    </div>
                </>
            )}

            {status === AVAILABLE && (
                <button
                    type="button"
                    className="event-detail-action event-detail-action--view"
                    onClick={viewDetail}
                >
                    View
                </button>
            )}
        </div>
    );
};

