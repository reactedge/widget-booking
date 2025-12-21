import {useEffect, useState} from "react";
import type {KeystoneUser} from "../../types/keystone/types.ts";
import {graphqlRequest} from "../../lib/graphql.ts";
import {getError} from "../../lib/error.ts";

const QUERY = `
  query {
    authenticatedItem {
      ... on User {
        id
        email
        name  
        eventHost {
          id
          name
        }
        eventType {
          id
          name
        }
        eventTypeGroup {
          id
          name
        }
        weekPreference
        cartItems {
          id
          quantity   
          price
          eventType {
            name
          }         
          event {
            id
            day
            startTime 
            endTime             
            eventHost {
              id            
              name
            }                       
          }      
        }  
        role {
          isEventHost
        }           
      }
    }
  }
`;

export function useKeystoneUser() {
    const [data, setData] = useState<KeystoneUser>();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<Error | null>(null);

    const load = async () => {
        setLoading(true);
        setError(null);

        try {
            const result = await graphqlRequest<{
                authenticatedItem: KeystoneUser;
            }>(QUERY);

            setData(result.authenticatedItem);
        } catch (err: unknown) {
            setError(getError(err));
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        load();
    }, []);

    return {
        keystoneAuthenticatedUser: data,
        userLoading: loading,
        userError: error,
        refetch: load };
}