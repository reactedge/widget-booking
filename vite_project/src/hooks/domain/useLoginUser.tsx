// domain/useLoginUser.ts
import {useKeystoneAuthenticateUser} from "../infra/useKeystoneAuthenticateUser.tsx";

interface LoginSuccess {
    id: string;
    email: string;
    name: string;
    role: {
        isEventHost: boolean;
    };
}

interface LoginFailure {
    message: string;
}

export const useLoginUser = () => {
    const { authenticate, loading, error } = useKeystoneAuthenticateUser();

    const login = async (
        email: string,
        password: string
    ): Promise<LoginSuccess | LoginFailure> => {
        const res = await authenticate({ email, password });

        const result = res?.item;

        if (!result) {
            return { message: "Unknown authentication error" };
        }

        // if (result.__typename === "UserAuthenticationWithPasswordFailure") {
        //     return { message: result.message };
        // }

        return result;
    };

    return {
        login,
        loadingSignin: loading,
        errorSignin: error,
    };
};
