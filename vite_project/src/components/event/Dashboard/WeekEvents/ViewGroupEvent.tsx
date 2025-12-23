import {useEventGroup} from "../../../../hooks/domain/useEventGroup.ts";
import {useVisitIntentState} from "../../../../state/Intent/useVisitIntentState.ts";
import {useEventType} from "../../../../hooks/domain/useEventType.tsx";
import {useVenueTranslation} from "../../../../hooks/ui/useVenueTranslation.ts";
import {Spinner} from "../../../global/Spinner.tsx";
import {getGroupEvent} from "../../../../domain/booking/getGroupEvent.ts";
import {EventStateProvider} from "../../../../state/Event/EventStateProvider.tsx";
import {EventHostSelect} from "../DayEvent/EventHostSelect.tsx";
import {EventEndTime} from "../DayEvent/EventEndTime.tsx";
import {AddToCart} from "../DayEvent/AddToCart.tsx";
import {getEventTitle} from "../../../../domain/formatters/getEventTitle.ts";

interface ViewGroupEventProps {
    eventIds: string[]
}

export const ViewGroupEvent: React.FC<ViewGroupEventProps> = ({ eventIds }) => {
    const { groupEvents, groupEventsLoading } = useEventGroup(eventIds)
    const {visitIntent} = useVisitIntentState();
    const { eventType, eventTypeLoading } = useEventType(visitIntent.eventTypeId)
    const t = useVenueTranslation();

    if (groupEventsLoading || eventTypeLoading || groupEvents === undefined || eventType === undefined) return <Spinner/>;

    const groupEvent = getGroupEvent(eventType, groupEvents);

    return (
        <EventStateProvider eventGroup={groupEvent}>
            <div className="view-group-event">
                <h5 className="view-group-event__title">
                    {t("Let's set your appointment details")}
                </h5>

                <div className="view-group-event__row">
                  <span className="view-group-event__label">
                    {t("Appointment")}
                  </span>
                    <p className="view-group-event__value">
                        {getEventTitle(groupEvent)}
                    </p>
                </div>

                <div className="view-group-event__row">
                  <span className="view-group-event__label">
                    {t("EventType")}
                  </span>
                    <span className="view-group-event__value">
                        {groupEvent.eventType}
                      </span>
                </div>

                <div className="view-group-event__row">
                  <span className="view-group-event__label">
                    {t("EventHost")}
                  </span>
                    <EventHostSelect eventGroup={groupEvent}/>
                </div>

                {/*{config.offerShampoo && (
                    <div className="view-group-event__row">
                        <span className="view-group-event__label">
                          {t("Shampoo")}
                        </span>
                        <ShampooSelect/>
                    </div>
                )}*/}

                <div className="view-group-event__row">
                  <span className="view-group-event__label">
                    {t("End Time")}
                  </span>
                    <EventEndTime />
                </div>

                {/*{config.showPrice && (*/}
                {/*    <div className="view-group-event__row">*/}
                {/*        <span className="view-group-event__label">*/}
                {/*          {t("Price")}*/}
                {/*        </span>*/}
                {/*        <EventPrice/>*/}
                {/*    </div>*/}
                {/*)}*/}

                <div className="view-group-event__actions">
                    <AddToCart />
                </div>
            </div>
        </EventStateProvider>
    );
}
