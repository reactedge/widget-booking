// infra/keystone/useKeystoneEventTypeGroups.ts
import { useEffect, useState } from "react";
import {graphqlRequest} from "../../lib/graphql.ts";
import {getError} from "../../lib/error.ts";
import type {KeystoneEvent} from "../../types/infra/keystone";

const QUERY = `
  query Events($where: EventWhereInput!) {
      events(where: $where) {
        id      
        startTime
        venue {
          name
        }
        status
        endTime       
        eventHost {
          id
          name
          eventTypes {
            id
            name
          }
        }
        day
      }      
    }
`;

export function useKeystoneEventGroup(eventIds: string[]) {
    const [data, setData] = useState<KeystoneEvent[]>();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<Error | null>(null);

    const load = async (eventIds: string[]) => {
        setLoading(true);
        setError(null);

        try {
            const result = await graphqlRequest<{
                events: KeystoneEvent[];
            }>(QUERY, { where: { id: {in: eventIds} } });

            setData(result.events);
        } catch (err: unknown) {
            setError(getError(err));
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        load(eventIds);
    }, [eventIds]);

    return { keystoneGroupEvents: data, loading, error, refetch: load };
}
