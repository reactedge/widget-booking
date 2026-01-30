import {useEventGroup} from "../../../../hooks/domain/useEventGroup.ts";
import {useVisitIntentState} from "../../../../state/Intent/useVisitIntentState.ts";
import {useEventType} from "../../../../hooks/domain/useEventType.tsx";
import {Spinner} from "../../../global/Spinner.tsx";
import {getGroupEvent} from "../../../../domain/booking/getGroupEvent.ts";
import {EventStateProvider} from "../../../../state/Event/EventStateProvider.tsx";
import {AddToCart} from "../DayEvent/AddToCart.tsx";
import {useState} from "react";
import {useUserState} from "../../../../state/User/useUserState.ts";
import {SignInOrRegister} from "../../../user-authentication/SignInOrRegister.tsx";
import {EventBookingForm} from "../DayEvent/EventBookingForm.tsx";

interface ViewGroupEventProps {
    eventIds: string[]
}

export const DrawerContent: React.FC<ViewGroupEventProps> = ({ eventIds }) => {
    const { groupEvents, groupEventsLoading } = useEventGroup(eventIds)
    const {visitIntent} = useVisitIntentState();
    const { eventType, eventTypeLoading } = useEventType(visitIntent.eventTypeId)
    const [showAuth, setShowAuth] = useState(false);
    const { user } = useUserState();

    if (groupEventsLoading || eventTypeLoading || groupEvents === undefined || eventType === undefined) return <Spinner/>;

    const groupEvent = getGroupEvent(eventType, groupEvents);

    const isReadyToPurchase = () => {
        return !showAuth || user
    }

    return (
        <EventStateProvider eventGroup={groupEvent}>
            <div className="drawer-content">

                {!isReadyToPurchase() && (<div className="drawer-section">
                    <SignInOrRegister/>
                </div>)}

                {isReadyToPurchase() && <EventBookingForm groupEvent={groupEvent} />}
            </div>

            {isReadyToPurchase() && (<div className="drawer-actions">
                <AddToCart onRequireAuth={() => {
                    setShowAuth(true)}
                }/>
            </div>)}
        </EventStateProvider>
    )
        ;
}
