// infra/keystone/useKeystoneEventTypeGroups.ts
import { useEffect, useState } from "react";
import {graphqlRequest} from "../../lib/graphql.ts";
import type {KeystoneEventTypeGroup} from "../../types/keystone/types.ts";

const QUERY = `
  query VenueEventTypeGroups($venueId: ID!) {
    venueEventTypeGroups(venueId: $venueId) {
      id
      name
    }
  }
`;

export function useKeystoneEventTypeGroups(venueId?: string) {
    const [data, setData] = useState<KeystoneEventTypeGroup[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<Error | null>(null);

    const load = async () => {
        if (!venueId) return;

        setLoading(true);
        setError(null);

        try {
            const result = await graphqlRequest<{
                venueEventTypeGroups: KeystoneEventTypeGroup[];
            }>(QUERY, { venueId });

            setData(result.venueEventTypeGroups);
        } catch (err: any) {
            setError(err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        load();
    }, [venueId]);

    return {
        keystoneEventTypeGroups: data,
        keystoneEventTypeLoading: loading,
        keystoneEventTypeError: error,
        refetch: load };
}
