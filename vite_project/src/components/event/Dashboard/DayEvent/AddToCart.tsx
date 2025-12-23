import React, {useState} from "react";
import {getEventCartQty} from "../../../../domain/cart/cart.ts";
import {ErrorState} from "../../../global/ErrorState.tsx";
import {SignInOrRegister} from "../../../user-authentication/SignInOrRegister.tsx";
import {useUserState} from "../../../../state/User/useUserState.ts";
import {useEventState} from "../../../../state/Event/useEventState.ts";
import {useVisitIntentState} from "../../../../state/Intent/useVisitIntentState.ts";
import {useAddToCart} from "../../../../hooks/domain/useAddToCart.tsx";

export const AddToCart: React.FC = () => {
    const { user } = useUserState();
    const { eventState } = useEventState();
    const { visitIntent } = useVisitIntentState();
    const { addToCart, loadingAddToCart, errorAddToCart } = useAddToCart();
    const [showAuth, setShowAuth] = useState(false);

    const handleAdd = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!eventState.activeEventId) {
            alert("Select an event host for your appointment");
            return;
        }

        if (!user) {
            setShowAuth(true);
            return;
        }

        try {
            await addToCart({
                eventId: eventState.activeEventId,
                eventTypeId: visitIntent.eventTypeId,
                shampoo: eventState.shampoo ? 1 : 0,
            });
        } catch (err) {
            console.error(err);
        }
    };

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
        <div>
            {eventAlreadyInCart && (
                <div className="in-cart">
                    <p>You&apos;re in!</p>
                </div>
            )}

            <button
                className="add-to-cart"
                type="button"
                disabled={!canAttemptAdd}
                onClick={handleAdd}
            >
                Book{loadingAddToCart && 'ing'} 🛒
            </button>

            {!user && showAuth && <SignInOrRegister />}
        </div>
    );
};
