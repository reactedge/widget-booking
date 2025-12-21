import {KeystoneCartItem} from "@/components/event/types/event";

export const formatMoney = (amount: number = 0) => {
    const formatter = new Intl.NumberFormat("en-GB", {
        style: "currency",
        currency: "GBP",
        minimumFractionDigits: 2,
    });

    return formatter.format(amount / 100);
}

export default function calcTotalPrice(cart: KeystoneCartItem[]) {
    return cart && cart.reduce((tally, cartItem) => {
        if (!cartItem.event) return tally; // products can be deleted, but they could still be in your cart
        return tally + cartItem.quantity * cartItem.price;
    }, 0);
}