import {useConfigState} from "../../../../state/Config/useConfigState.ts";
import {useVisitIntentState} from "../../../../state/Intent/useVisitIntentState.ts";
import {Spinner} from "../../../global/Spinner.tsx";
import {GroupEventHandler} from "../../../../models/GroupEvent.ts";
import {tr} from "../../../../lib/translate.ts";
import {getEventTitle} from "../../../../lib/group-event.ts";
import {useEventGroup} from "../../../../hooks/domain/useEventGroup.ts";
import {useEventType} from "../../../../hooks/domain/useEventType.tsx";
import {EventHostSelect} from "../DayEvent/EventHostSelect.tsx";
import {EventStateProvider} from "../../../../state/Event/EventStateProvider.tsx";
import {EventEndTime} from "../DayEvent/EventEndTime.tsx";
import {AddToCart} from "../DayEvent/AddToCart.tsx";

interface ViewGroupEventProps {
    eventIds: string[]
}

export const ViewGroupEvent: React.FC<ViewGroupEventProps> = ({ eventIds }) => {
    const { groupEvents, groupEventsLoading } = useEventGroup(eventIds)
    const {config} = useConfigState();
    const {visitIntent} = useVisitIntentState();
    const { eventType, eventTypeLoading } = useEventType(visitIntent.eventTypeId)

    if (groupEventsLoading || eventTypeLoading || groupEvents === undefined) return <Spinner/>;

    const handler = new GroupEventHandler(visitIntent, eventType);
    const groupEvent = handler.getGroupEvent(groupEvents);

    return (
        <EventStateProvider eventGroup={groupEvent}>
            <div className="view-group-event">
                <h5 className="view-group-event__title">
                    {tr("Let's set your appointment details", config.venue.id)}
                </h5>

                <div className="view-group-event__row">
                  <span className="view-group-event__label">
                    {tr("Appointment", config.venue.id)}
                  </span>
                    <p className="view-group-event__value">
                        {getEventTitle(groupEvent)}
                    </p>
                </div>

                <div className="view-group-event__row">
                  <span className="view-group-event__label">
                    {tr("EventType", config.venue.id)}
                  </span>
                    <span className="view-group-event__value">
                        {groupEvent.eventType}
                      </span>
                </div>

                <div className="view-group-event__row">
                  <span className="view-group-event__label">
                    {tr("EventHost", config.venue.id)}
                  </span>
                    <EventHostSelect eventGroup={groupEvent}/>
                </div>

                {/*{config.offerShampoo && (
                    <div className="view-group-event__row">
                        <span className="view-group-event__label">
                          {tr("Shampoo", config.venue.id)}
                        </span>
                        <ShampooSelect/>
                    </div>
                )}*/}

                <div className="view-group-event__row">
                  <span className="view-group-event__label">
                    {tr("End Time", config.venue.id)}
                  </span>
                    <EventEndTime />
                </div>

                {/*{config.showPrice && (*/}
                {/*    <div className="view-group-event__row">*/}
                {/*        <span className="view-group-event__label">*/}
                {/*          {tr("Price", config.venue.id)}*/}
                {/*        </span>*/}
                {/*        <EventPrice/>*/}
                {/*    </div>*/}
                {/*)}*/}

                <div className="view-group-event__actions">
                    <AddToCart className="view-group-event__submit">
                        {tr("Book Now", config.venue.id)}
                    </AddToCart>
                </div>
            </div>
        </EventStateProvider>
    );
}
