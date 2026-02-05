import {useEffect, useState} from "react";
import {getEventCartQty} from "../../../../domain/cart/cart.ts";
import {ErrorState} from "../../../global/ErrorState.tsx";
import {useUserState} from "../../../../state/User/useUserState.ts";
import {useEventState} from "../../../../state/Event/useEventState.ts";
import {useVisitIntentState} from "../../../../state/Intent/useVisitIntentState.ts";
import {useAddToCart} from "../../../../hooks/domain/useAddToCart.tsx";
import {useDashboardState} from "../../../../state/Dashboard/useDashboardState.ts";
import {Turnstile} from "../../../../security/Turnstile.tsx";
import {useSystemState} from "../../../../state/System/useSystemState.ts";
import {activity} from "../../../../../activity";
import {UserState} from "../../../user-authentication/UserState.tsx";
import {useHumanVerification} from "../../../../hooks/domain/useHumanVerification.tsx";

interface AddToCartProps {
    onRequireAuth: () => void
}

export function AddToCart({onRequireAuth}: AddToCartProps) {
    const { user } = useUserState();
    const { eventState } = useEventState();
    const { visitIntent } = useVisitIntentState();
    const { addToCart, loadingAddToCart, errorAddToCart } = useAddToCart();
    const { increaseVersionNumber, setLastBookedEventId } = useDashboardState();
    const [awaitingSecurity, setAwaitingSecurity] = useState(false);
    const { cloudflareKey, isTurnstileEnabled } = useSystemState();
    const turnstileEnabled = isTurnstileEnabled();
    const { token, onToken, isHumanVerified, requireVerification } = useHumanVerification();

    const refreshDashboard = () => {
        increaseVersionNumber()
        if (eventState.activeEventId) setLastBookedEventId(eventState.activeEventId)
    }

    const handleAdd = async () => {
        if (!eventState.activeEventId) {
            alert("Select an event host for your appointment");
            return;
        }

        if (!isHumanVerified) {
            requireVerification()
            return;
        }

        try {
            await addToCart({
                eventId: eventState.activeEventId,
                eventTypeId: visitIntent.eventTypeId,
                shampoo: eventState.shampoo ? 1 : 0,
                userId: user?.id || '',
                turnstileToken: token as string,
            });

            refreshDashboard();
            setAwaitingSecurity(false);
        } catch (err) {
            console.error(err);
            setAwaitingSecurity(false);
        }
    };

    const onAddClick = async () => {
        if (!user) {
            setAwaitingSecurity(true);
            onRequireAuth();
            return;
        }

        await handleAdd();
    };

    useEffect(() => {
        if (awaitingSecurity && token && user) {
            handleAdd();
        }
    }, [awaitingSecurity, token, user]);

    const activeEventId = eventState.activeEventId;

    const eventAlreadyInCart =
        !!user &&
        !!activeEventId &&
        getEventCartQty(user.cartItems, [activeEventId]) > 0;

    const canAttemptAdd =
        !!activeEventId &&
        !eventAlreadyInCart &&
        !loadingAddToCart &&
        (!turnstileEnabled || Boolean(token));

    if (errorAddToCart) return <ErrorState />

    activity('form-ready', 'Can submit',{
        turnstileEnabled,
        token
    });

    return (
        <>
            {eventAlreadyInCart && (
                <div className="in-cart">
                    <p>You&apos;re in!</p>
                </div>
            )}
            <button className="drawer-primary"
                    disabled={!canAttemptAdd}
                    onClick={onAddClick}
            >
                Book{loadingAddToCart && 'ing'} appointment+-
            </button>
            {isTurnstileEnabled() && (
                <Turnstile
                    siteKey={cloudflareKey}
                    containerId="booking-turnstile"
                    onToken={onToken}
                />
            )}
            <UserState />
        </>
    );
};
