import {Sign} from "./Sign.tsx";
import {useUserState} from "../../state/User/useUserState.ts";
import {Spinner} from "../global/Spinner.tsx";
import {ErrorState} from "../global/ErrorState.tsx";

export const SignInOrRegister: React.FC = () => {
    const {loading, error} = useUserState();

    if (loading) return <Spinner />
    if (error) return <ErrorState />

    return (
        <div className="drawer-auth">
            <h4>Sign in to continue</h4>
            <Sign />
            <div className="drawer-auth-switch">
                New here? <button>Sign up</button>
            </div>
        </div>
    )
}
