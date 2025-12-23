import {useCallback, useEffect, useState} from "react";
import {graphqlRequest} from "../../lib/graphql.ts";
import {getError} from "../../lib/error.ts";
import type {KeystoneEventCalculationParams} from "../../types/keystone/types.ts";

const QUERY = `
    query CalculateEventDuration($eventTypeId: ID!, $eventId: ID!, $shampoo: Int) {
      calculateEventDuration(eventTypeId: $eventTypeId, eventId: $eventId, shampoo: $shampoo)
    }
`;

export const useKeystoneEventDuration = ({
     eventId,
     eventTypeId,
     shampoo = false,
 }: KeystoneEventCalculationParams) => {
    const ready = !!eventId && !!eventTypeId;

    const [data, setData] = useState<string | undefined>();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<Error | null>(null);

    const load = useCallback(async () => {
        if (!ready) return;

        setLoading(true);
        setError(null);

        try {
            const result = await graphqlRequest<{
                calculateEventDuration: string;
            }>(QUERY, {
                eventId,
                eventTypeId,
                shampoo: shampoo ? 1 : 0,
            });

            setData(result.calculateEventDuration);
        } catch (err: unknown) {
            setError(getError(err));
        } finally {
            setLoading(false);
        }
    }, [ready, eventId, eventTypeId, shampoo]);

    useEffect(() => {
        load();
    }, [load]);

    return {
        duration: data,
        loadingDuration: loading,
        errorDuration: error,
        refetch: load,
    };
};
