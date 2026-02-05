import type {KeystoneAuthenticatedUser} from "../../types/infra/keystone";
import type {EventInfoState} from "../../state/Event/type.ts";
import type {VisitIntentInfoState} from "../../state/Intent/type.ts";
import {useAddToCart} from "./useAddToCart.tsx";
import {useDashboardState} from "../../state/Dashboard/useDashboardState.ts";
import {useState} from "react";
import {useHumanVerification} from "./useHumanVerification.tsx";

export function useAddEventToCart({
      user,
      eventState,
      visitIntent,
  }: {
    user: KeystoneAuthenticatedUser;
    eventState: EventInfoState;
    visitIntent: VisitIntentInfoState;
}) {
    const { addToCart, loadingAddToCart, errorAddToCart } = useAddToCart();
    const { increaseVersionNumber, setLastBookedEventId } = useDashboardState();
    //const [awaitingSecurity, setAwaitingSecurity] = useState(false);
    const [token, setToken] = useState<string | null>(null);

    const { onToken, isHumanVerified, requireVerification, turnstileToken } = useHumanVerification();

    const refreshDashboard = () => {
        increaseVersionNumber()
        if (eventState.activeEventId) setLastBookedEventId(eventState.activeEventId)
    }

    const attemptAdd = async () => {
        if (!eventState.activeEventId) {
            alert("Select an event host for your appointment");
            return;
        }

        if (!isHumanVerified) {
            requireVerification();
            return;
        }

        try {
            await addToCart({
                eventId: eventState.activeEventId,
                eventTypeId: visitIntent.eventTypeId,
                shampoo: eventState.shampoo ? 1 : 0,
                userId: user?.id || '',
                turnstileToken,
            });

            refreshDashboard();
            //setAwaitingSecurity(false);
        } catch (err) {
            console.error(err);
            //setAwaitingSecurity(false);
        }
    };

    return {
        attemptAdd,
        loadingAddToCart,
        errorAddToCart,
        token,
        onToken,
        isHumanVerified,
    };
}
