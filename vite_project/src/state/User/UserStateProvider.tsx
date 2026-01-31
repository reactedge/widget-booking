import {type ReactNode, useEffect} from "react";
import {LocalUserStateContext} from "./UserState.tsx";
import {useImmer} from "use-immer";
import type { UserState} from "./type.ts";
import type {AuthenticatedUser} from "../../types/domain/user.type.ts";
import {fetchUserFromBridge} from "../../domain/user/authentication.ts";

const LocalStateProvider = LocalUserStateContext.Provider;



interface UserStateProviderProps {
    children: ReactNode;
}

export const UserStateProvider: React.FC<UserStateProviderProps> = ({ children}) => {
    const [state, setState] = useImmer<UserState>({
        user: undefined,
        loading: true,
        error: null
    });

    const startLoading = (draft: UserState) => {
        draft.loading = true;
        draft.error = null;
    };

    const setSuccess = (draft: UserState, user: AuthenticatedUser | undefined) => {
        draft.user = user;
        draft.loading = false;
    };

    const setFailure = (draft: UserState, err: Error) => {
        draft.user = undefined;
        draft.loading = false;
        draft.error = err;
    };

    const refresh = async () => {
        try {
            setState(startLoading);

            const user = await fetchUserFromBridge();

            setState(draft => setSuccess(draft, user));
        } catch (err) {
            setState(draft => setFailure(draft, err as Error));
        }
    };

    useEffect(() => {
        let alive = true;

        const safeRefresh = async () => {
            try {
                setState(startLoading);

                const user = await fetchUserFromBridge();
                if (!alive) return;

                setState(draft => setSuccess(draft, user));
            } catch (err) {
                if (!alive) return;

                setState(draft => setFailure(draft, err as Error));
            }
        };

        safeRefresh();

        return () => {
            alive = false;
        };
    }, []);

    return (
        <LocalStateProvider
            value={{
                user: state.user,
                loading: state.loading,
                error: state.error,
                refreshUser: refresh,
            }}
        >
            {children}
        </LocalStateProvider>
    );
};

