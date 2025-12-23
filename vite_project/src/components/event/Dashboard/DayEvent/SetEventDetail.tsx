import type {DayGroupEvent} from "../../../../types/domain/dashboard.type.tsx";
import {useEventState} from "../../../../state/Event/useEventState.ts";
import {AVAILABLE, IN_CART_EVENT} from "../../../../types/domain/event.type.ts";
import {getTime} from "../../../../lib/date.ts";
import {useVenueTranslation} from "../../../../hooks/ui/useVenueTranslation.ts";
import {groupEventStatus, groupEventStatusLabel} from "../../../../domain/event/getGroupEventStatus.ts";

interface EventProps {
    eventGroup: DayGroupEvent;
    onView: (eventIds: string[]) => void;
}

export const SetEventDetail: React.FC<EventProps> = ({eventGroup, onView}) => {
    const {resetActiveEvent} = useEventState();
    const t = useVenueTranslation();

    const status = groupEventStatus(eventGroup);

    const viewDetail = (e: React.FormEvent) => {
        e.preventDefault();
        resetActiveEvent();
        onView(eventGroup.eventIds);
    };

    return (
        <>
            {status === AVAILABLE && (
                <button
                    className="event-card__action"
                    aria-label="View details"
                    onClick={viewDetail}
                >
                    👁
                </button>
            )}

            {status !== AVAILABLE && (
                <div className={`event-card__status event-card__status--${status}`}>
                    {groupEventStatusLabel(eventGroup)}
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
        </>
    );
};

