// infra/keystone/useKeystoneEventTypeGroups.ts
import { useEffect, useState } from "react";
import {graphqlRequest} from "../../lib/graphql.ts";
import type {KeystoneEventHost} from "../../types/keystone/types.ts";

const QUERY = `
    query EventHosts {
      eventHosts {
        id
        name
        eventTypes {
            id
        }
      }
    }
`;

export function useKeystoneEventHosts() {
    const [data, setData] = useState<KeystoneEventHost[]>();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<Error | null>(null);

    const load = async () => {
        setLoading(true);
        setError(null);

        try {
            const result = await graphqlRequest<{
                eventHosts: KeystoneEventHost[];
            }>(QUERY, {});

            setData(result.eventHosts);
        } catch (err: any) {
            setError(err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        load();
    }, []);

    return { keystoneEventHosts: data, loading, error, refetch: load };
}
