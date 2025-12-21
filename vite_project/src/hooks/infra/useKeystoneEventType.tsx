// infra/keystone/useKeystoneEventTypeGroups.ts
import { useEffect, useState } from "react";
import {graphqlRequest} from "../../lib/graphql.ts";
import type {KeystoneEventType} from "../../types/keystone/types.ts";
import {getError} from "../../lib/error.ts";

const QUERY = `
  query EventType($where: EventTypeWhereUniqueInput!) {
      eventType(where: $where) {
        id
        name
      }
    }
`;

export function useKeystoneEventType(eventTypeId?: string) {
    const [data, setData] = useState<KeystoneEventType>();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<Error | null>(null);

    const load = async (eventTypeId?: string) => {
        if (!eventTypeId) return;

        setLoading(true);
        setError(null);

        try {
            const result = await graphqlRequest<{
                eventType: KeystoneEventType;
            }>(QUERY, { where: { id: eventTypeId } });

            setData(result.eventType);
        } catch (err: unknown) {
            setError(getError(err));
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        load(eventTypeId);
    }, [eventTypeId]);

    return { keystoneEventType: data, loading, error, refetch: load };
}
