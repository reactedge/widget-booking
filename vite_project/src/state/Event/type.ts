export interface EventInfoState {
    activeEventId: string | undefined,
    shampoo: boolean,
}

export interface EventState {
    eventState: EventInfoState,
    resetActiveEvent: () => void
    toggleActiveEvent: (id: string) => void
    toggleShampooEvent: () => void
}