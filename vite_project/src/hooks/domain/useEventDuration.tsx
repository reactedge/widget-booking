import {useKeystoneEventDuration} from "../infra/useKeystoneEventDuration.tsx";

export const useEventDuration = (
     eventTypeId: string,
     eventId?: string,
     shampoo = false) => {
    const {
        duration,
        loadingDuration,
        errorDuration,
        refetch,
    } = useKeystoneEventDuration({eventId, eventTypeId, shampoo});

    return {
        duration,
        loadingDuration,
        errorDuration,
        refetch,
    };
}