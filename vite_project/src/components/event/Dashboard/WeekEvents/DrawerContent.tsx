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
import {getEventDateTime, getEventType} from "../../../../domain/formatters/getEventType.ts";
import {useState} from "react";
import {useUserState} from "../../../../state/User/useUserState.ts";
import {SignInOrRegister} from "../../../user-authentication/SignInOrRegister.tsx";

interface ViewGroupEventProps {
    eventIds: string[]
}

export const DrawerContent: React.FC<ViewGroupEventProps> = ({ eventIds }) => {
    const { groupEvents, groupEventsLoading } = useEventGroup(eventIds)
    const {visitIntent} = useVisitIntentState();
    const { eventType, eventTypeLoading } = useEventType(visitIntent.eventTypeId)
    const [showAuth, setShowAuth] = useState(false);
    const { user } = useUserState();
    const t = useVenueTranslation();

    if (groupEventsLoading || eventTypeLoading || groupEvents === undefined || eventType === undefined) return <Spinner/>;

    const groupEvent = getGroupEvent(eventType, groupEvents);

    return (
        <EventStateProvider eventGroup={groupEvent}>
            <div className="drawer-content">
                {showAuth && !user && (<div className="drawer-section">
                    <SignInOrRegister/>
                </div>)}

                {!showAuth && (
                    <>
                        <div className="drawer-section">
                            <div className="drawer-summary">
                                <strong>{getEventType(groupEvent)}</strong>
                                <p>{getEventDateTime(groupEvent)}</p>
                            </div>
                        </div>

                        <div className="drawer-section">
                                        <label className="drawer-label">{t("Event host")}</label>
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

                        <div className="drawer-section drawer-outcome">
                            <span className="drawer-label">{t("End at")}</span>
                            <strong><EventEndTime/></strong>
                        </div>

                        {/*{config.showPrice && (*/}
                        {/*    <div className="view-group-event__row">*/}
                        {/*        <span className="view-group-event__label">*/}
                        {/*          {t("Price")}*/}
                        {/*        </span>*/}
                        {/*        <EventPrice/>*/}
                        {/*    </div>*/}
                        {/*)}*/}
                    </>
                )}
            </div>

            <div className="drawer-actions">
                <AddToCart onRequireAuth={() => {
                    setShowAuth(true)}
                }/>
            </div>
        </EventStateProvider>
    )
        ;
}
