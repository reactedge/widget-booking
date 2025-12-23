// infra/graphqlClient.ts
const GRAPHQL_ENDPOINT = import.meta.env.VITE_KEYSTONE_GRAPHQL_ENDPOINT;

export async function graphqlRequest<T>(
    query: string,
    variables?: Record<string, unknown>
): Promise<T> {
    const res = await fetch(GRAPHQL_ENDPOINT, {
        method: "POST",
        credentials: 'include',
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ query, variables }),
    });

    if (!res.ok) {
        throw new Error(`Network error: ${res.status}`);
    }

    const json = await res.json();

    if (json.errors) {
        throw new Error(json.errors.map((e: any) => e.message).join(", "));
    }

    return json.data;
}
