import {type ReactNode} from "react";
import {LocalUserStateContext} from "./UserState.tsx";
import {useKeystoneAuthenticatedUser} from "../../hooks/infra/useKeystoneAuthenticatedUser.tsx";
import {mapKeystoneUser} from "../../lib/user.ts";
import type {AuthenticatedUser} from "../../types/domain/user.type.ts";

const LocalStateProvider = LocalUserStateContext.Provider;

interface UserStateProviderProps {
    children: ReactNode;
}

export const UserStateProvider: React.FC<UserStateProviderProps> = ({ children }) => {
    const {
        keystoneAuthenticatedUser,
        userLoading,
        userError,
        refetch,
    } = useKeystoneAuthenticatedUser();

    const user: AuthenticatedUser | undefined = keystoneAuthenticatedUser ? mapKeystoneUser(keystoneAuthenticatedUser): undefined;

    return (
        <LocalStateProvider
            value={{
                user,
                loading: userLoading,
                error: userError,
                refreshUser: refetch,
            }}
        >
            {children}
        </LocalStateProvider>
    );
};

