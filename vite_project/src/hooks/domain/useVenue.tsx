// domain/hooks/useEventTypeGroups.ts
import {useKeystoneVenue} from "../infra/useKeystoneVenue.tsx";

const VENUE_IDENTIFIER = import.meta.env.VITE_VENUE_CODE;

export function useVenue() {
    const { keystoneVenue, loading, error, refetch } =
        useKeystoneVenue(VENUE_IDENTIFIER);

    const venue = keystoneVenue? {
        id: keystoneVenue.id,
        code: keystoneVenue.code,
        name: keystoneVenue.name
    }: undefined

    return {
        venue,
        venueLoading: loading,
        venueError: error,
        refetch,
    };
}
