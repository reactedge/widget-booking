import {useCallback, useState} from "react";
import {graphqlRequest} from "../../lib/graphql.ts";
import type {KeystoneCartEventParams} from "../../types/infra/keystone";

const MUTATION = `
    mutation AddToCart($eventId: ID!, $eventTypeId: ID!, $shampoo: Int, $turnstileToken: String!) {
      addToCart(eventId: $eventId, eventTypeId: $eventTypeId, shampoo: $shampoo, turnstileToken: $turnstileToken)
    }
`;

export const useKeystoneAddToCart = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<Error | null>(null);

    const addToCart = useCallback(
        async (variables: KeystoneCartEventParams) => {
            setLoading(true);
            setError(null);

            try {
                const result = await graphqlRequest<{
                    addToCart: string;
                }>(MUTATION, variables);

                return result.addToCart;
            } catch (err) {
                setError(err as Error);
                throw err;
            } finally {
                setLoading(false);
            }
        },
        []
    );

    return {
        addToCart,
        loadingAddToCart: loading,
        errorAddToCart: error,
    };
};
