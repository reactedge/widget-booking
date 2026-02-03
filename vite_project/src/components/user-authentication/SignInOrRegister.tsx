import {Sign} from "./Sign.tsx";
import {useUserState} from "../../state/User/useUserState.ts";
import {Spinner} from "../global/Spinner.tsx";
import {SignWithGoogle} from "./SignWithGoogle.tsx";

export const SignInOrRegister: React.FC = () => {
    const {loading} = useUserState();

    if (loading) return <Spinner />

    return (
        <div className="drawer-auth">
            <Sign />
            <SignWithGoogle />
            <div className="drawer-auth-switch">
                New here? <button>Sign up</button>
            </div>
        </div>
    )
}
