import {useMemo} from "react";
import {buildEventFilter} from "../../lib/buildEventFilter.ts";
import type {FilterParams} from "../../types/domain/types.ts";

export const useFilter = (params: FilterParams | undefined) => {
    return useMemo(() => {
        if (!params) {
            return undefined;
        }

        return buildEventFilter({
            eventTypeId: params.eventTypeId,
            weekStart: params.weekStart,
            venueId: params.venueId,
            eventHostIds: params.eventHostIds,
        });
    }, [
        params?.eventTypeId,
        params?.weekStart,
        params?.venueId,
        params?.eventHostIds,
    ]);
};


