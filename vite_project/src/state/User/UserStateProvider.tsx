import {type ReactNode} from "react";
import {LocalUserStateContext} from "./UserState.tsx";
import {useKeystoneAuthenticatedUser} from "../../hooks/infra/useKeystoneAuthenticatedUser.tsx";
import {mapKeystoneUser} from "../../lib/user.ts";

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

    const user = keystoneAuthenticatedUser ? mapKeystoneUser(keystoneAuthenticatedUser): null;

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

