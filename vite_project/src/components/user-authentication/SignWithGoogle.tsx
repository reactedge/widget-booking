import {loginWithGoogle} from "../../domain/user/authentication.ts";
import {useUserState} from "../../state/User/useUserState.ts";

export const SignWithGoogle: React.FC = () => {
    const { config } = useUserState();

    const handleLogin = async (e) => {
        e.preventDefault()
        await loginWithGoogle(config);
    };

    return (
        <form className="drawer-auth-form" >
            <button onClick={handleLogin}>Continue with Google</button>
        </form>
    )
};