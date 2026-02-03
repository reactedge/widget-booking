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

interface AddToCartProps {
    onRequireAuth: () => void
}

export function AddToCart({onRequireAuth}: AddToCartProps) {
    const { user } = useUserState();
    const { eventState } = useEventState();
    const { visitIntent } = useVisitIntentState();
    const { addToCart, loadingAddToCart, errorAddToCart } = useAddToCart();
    const { increaseVersionNumber, setLastBookedEventId } = useDashboardState();
    const { cloudflareKey, isTurnstileEnabled } = useSystemState()
    const [verifiedAt, setVerifiedAt] = useState<number | null>(null);
    const [awaitingSecurity, setAwaitingSecurity] = useState(false);
    const [turnstileToken, setTurnstileToken] = useState<string | null>(null);

    const isHumanVerified =
        turnstileToken &&
        verifiedAt &&
        Date.now() - verifiedAt < 1000 * 90; // 90s safety window

    activity('add-to-cart', 'Add To Cart Data',{
        cloudflareKey,
        turnstileToken,
        turnstileEnabled: isTurnstileEnabled(),
        isHumanVerified
    });

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
            window.dispatchEvent(
                new CustomEvent("booking:security-required")
            );
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
        const onSuccess = (e: CustomEvent) => {
            setTurnstileToken(e.detail.token);
            setVerifiedAt(Date.now());
        };

        const onExpired = () => {
            setTurnstileToken(null);
            setVerifiedAt(null);
        };

        window.addEventListener("booking:security-success", onSuccess as EventListener);
        window.addEventListener("booking:security-expired", onExpired);

        return () => {
            window.removeEventListener("booking:security-success", onSuccess as EventListener);
            window.removeEventListener("booking:security-expired", onExpired);
        };
    }, []);

    useEffect(() => {
        if (awaitingSecurity && turnstileToken && user) {
            handleAdd();
        }
    }, [awaitingSecurity, turnstileToken, user]);

    const activeEventId = eventState.activeEventId;

    const eventAlreadyInCart =
        !!user &&
        !!activeEventId &&
        getEventCartQty(user.cartItems, [activeEventId]) > 0;

    const canAttemptAdd =
        !!activeEventId &&
        !eventAlreadyInCart &&
        !loadingAddToCart;

    if (errorAddToCart) return <ErrorState />

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
                />
            )}
            <UserState />
        </>
    );
};
