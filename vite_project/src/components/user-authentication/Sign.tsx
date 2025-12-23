import {useLoginUser} from "../../hooks/domain/useLoginUser.tsx";
import {useState} from "react";
import {Spinner} from "../global/Spinner.tsx";
import {useUserState} from "../../state/User/useUserState.ts";

export const Sign: React.FC<{ onSuccess?: () => void }> = ({ onSuccess }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [submitting, setSubmitting] = useState(false);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);
    const {refreshUser} = useUserState()

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setErrorMessage(null);

        try {
            setSubmitting(true);
            const res = await login(email, password);

            if ('message' in res) {
                setErrorMessage(res.message);
                return;
            }

            refreshUser();
            onSuccess?.();
        } catch {
            setErrorMessage('Incorrect email or password');
        } finally {
            setSubmitting(false);
        }
    };

    const {login, loadingSignin} = useLoginUser();

    if (loadingSignin) return <Spinner />

    return (
        <form className="drawer-auth-form" onSubmit={handleSubmit}>
            <h4>Sign in to confirm your appointment</h4>

            {errorMessage && <p className="form-error">{errorMessage}</p>}

            <label>
                Email
                <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
            </label>

            <label>
                Password
                <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
            </label>

            <button type="submit" disabled={submitting}>
                {submitting ? 'Signing in…' : 'Sign in & continue'}
            </button>
        </form>

    );
};