// domain/hooks/useEventTypeGroups.ts
import {useKeystoneUser} from "../infra/useKeystoneUser.tsx";
import type {UserIdentity} from "../../types/domain/user.type.ts";

export function useUser() {
    const {
        keystoneAuthenticatedUser,
        userLoading,
        userError,
        refetch
    } = useKeystoneUser();

    const user: UserIdentity | undefined =
        keystoneAuthenticatedUser
            ? {
                id: keystoneAuthenticatedUser.id,
                name: keystoneAuthenticatedUser.name
            }
            : undefined;

    return {
        user,
        userLoading,
        userError,
        refetch,
    };
}
