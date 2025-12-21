import {KeystoneCartItem} from "@/components/event/types/event";

export const getEventCartQty = (cart: KeystoneCartItem[], eventIds: string[]): number => {
    const cartItem = cart?.filter((item: KeystoneCartItem) => eventIds.indexOf(item.event.id)>-1)
    if (cartItem && cartItem.length > 0) {
        return cartItem[0].quantity
    }

    return 0
}

export const isEventInCart = (cart: KeystoneCartItem[], eventId: string): boolean => {
    const cartItem = cart?.filter((item: KeystoneCartItem) => item.event.id === eventId)
    if (cartItem && cartItem.length > 0) {
        return true
    }

    return false
}