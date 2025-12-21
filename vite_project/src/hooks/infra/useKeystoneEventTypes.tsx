// infra/keystone/useKeystoneEventTypeGroups.ts
import { useEffect, useState } from "react";
import {graphqlRequest} from "../../lib/graphql.ts";
import type {KeystoneEventType} from "../../types/keystone/types.ts";
import {getError} from "../../lib/error.ts";

const QUERY = `
  query EventTypes($where: EventTypeWhereInput!, $orderBy: [EventTypeOrderByInput!]!) {
      eventTypes(where: $where, orderBy: $orderBy) {
        id
        name
      }
    }
`;

export function useKeystoneEventTypes(groupId?: string) {
    const [data, setData] = useState<KeystoneEventType[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<Error | null>(null);

    const load = async (groupId?: string) => {
        if (!groupId) return;

        setLoading(true);
        setError(null);

        try {
            const result = await graphqlRequest<{
                eventTypes: KeystoneEventType[];
            }>(QUERY, {
                where: { group: { id: { equals: groupId } } },
                orderBy: [ { name: "asc" } ] }
            );

            setData(result.eventTypes);
        } catch (err: unknown) {
            setError(getError(err));
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        load(groupId);
    }, [groupId]);

    return { keystoneEventTypes: data, loading, error, refetch: load };
}
