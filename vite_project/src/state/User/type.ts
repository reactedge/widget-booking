import type {AuthenticatedUser} from "../../types/domain/user.type.ts";

export interface UserState {
    user: AuthenticatedUser | undefined;
    loading: boolean;
    error?: Error | null;
    refreshUser: () => Promise<void>;
}