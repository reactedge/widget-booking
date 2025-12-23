// infra/keystone/useKeystoneEventTypeGroups.ts
import { useEffect, useState } from "react";
import {graphqlRequest} from "../../lib/graphql.ts";
import {getError} from "../../lib/error.ts";
import type {KeystoneEventHost} from "../../types/infra/keystone";

const QUERY = `
    query Query($where: EventHostWhereInput!) {
        eventHosts(where: $where) {
            id
            name
            eventTypes {
                id
            }
        }
    }   
`;

export function useKeystoneEventHosts(venueId?: string) {
    const [data, setData] = useState<KeystoneEventHost[]>();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<Error | null>(null);

    const load = async (venueId?: string) => {
        if (!venueId) {
            setData(undefined);
            return;
        }

        setLoading(true);
        setError(null);

        try {
            const result = await graphqlRequest<{
                eventHosts: KeystoneEventHost[];
            }>(
                QUERY,
                { where: { venue: { id: { equals: venueId } } } }
            );

            setData(result.eventHosts);
        } catch (err: unknown) {
            setError(getError(err));
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        load(venueId);
    }, [venueId]);

    return {
        keystoneEventHosts: data,
        loading,
        error,
        refetch: load,
    };
}
