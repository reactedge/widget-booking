// domain/hooks/useEventTypeGroups.ts
import {useKeystoneEventHosts} from "../infra/useKeystoneEventHosts.tsx";

export function useEventHosts(venueId?: string) {
    const {
        keystoneEventHosts,
        loading: eventTypeLoading,
        error: eventTypeError,
        refetch,
    } = useKeystoneEventHosts(venueId);

    const eventHostIds = keystoneEventHosts? keystoneEventHosts.map((host) => {
        return host.id
    }): undefined

    return {
        eventHostIds,
        hostsLoading: eventTypeLoading,
        hostsError: eventTypeError,
        refetch,
    };
}