export interface GroupEventInfoState {
    activeGroupEventHash: string | undefined
}

export interface EventState {
    groupEventState: GroupEventInfoState,
    resetActiveGroupEvent: () => void
    toggleActiveGroupEvent: (eventIds: string[]) => void
}