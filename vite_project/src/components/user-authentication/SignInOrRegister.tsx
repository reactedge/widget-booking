import {Sign} from "./Sign.tsx";
import {SignUp} from "./SignUp.tsx";
import {useUserState} from "../../state/User/useUserState.ts";
import {Spinner} from "../global/Spinner.tsx";
import {ErrorState} from "../global/ErrorState.tsx";

export const SignInOrRegister: React.FC = () => {
    const {user, loading, error} = useUserState();

    if (user) return null;
    if (loading) return <Spinner />
    if (error) return <ErrorState />

    return (
        <>
            <Sign />
            <SignUp />
        </>
    );
}
