// domain/useLoginUser.ts
import { useAuthenticateUser } from "../infra/authenticateUser";
import {useCallback, useState} from "react";
import type {KeystoneAuthenticationParams} from "../../types/keystone/types.ts";
import {graphqlRequest} from "../../lib/graphql.ts";

const MUTATION = `
  mutation AuthenticateUserWithPassword($email: String!, $password: String!) {
    authenticateUserWithPassword(email: $email, password: $password) {
      ... on UserAuthenticationWithPasswordSuccess {
        item {
          id
          email
          name   
          role {
             isEventHost
          }   
        }
      }
      ... on UserAuthenticationWithPasswordFailure {
        message
      }
    }
  }
`;

interface AuthSuccess {
    __typename: "UserAuthenticationWithPasswordSuccess";
    item: {
        id: string;
        email: string;
        name: string;
        role: {
            isEventHost: boolean;
        };
    };
}

interface AuthFailure {
    __typename: "UserAuthenticationWithPasswordFailure";
    message: string;
}

type AuthenticateUserResult = AuthSuccess | AuthFailure;

export const useKeystoneAuthenticateUser = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<Error | null>(null);

    const authenticate = useCallback(
        async (variables: KeystoneAuthenticationParams) => {
            setLoading(true);
            setError(null);

            try {
                const result = await graphqlRequest<{
                    authenticateUserWithPassword: { data: { authenticateUserWithPassword: AuthenticateUserResult }};
                }>(MUTATION, variables);

                return result.authenticateUserWithPassword;
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
        authenticate,
        loading,
        error,
    };
};
