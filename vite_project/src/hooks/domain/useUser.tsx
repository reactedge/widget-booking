// // domain/hooks/useEventTypeGroups.ts
// import {useKeystoneAuthenticatedUser} from "../infra/useKeystoneAuthenticatedUser.tsx";
// import type {UserIdentity} from "../../types/domain/user.type.ts";
//
// export function useUser() {
//     const {
//         keystoneAuthenticatedUser,
//         userLoading,
//         userError,
//         refetch
//     } = useKeystoneAuthenticatedUser();
//
//     const user: UserIdentity | undefined =
//         keystoneAuthenticatedUser
//             ? {
//                 id: keystoneAuthenticatedUser.id,
//                 name: keystoneAuthenticatedUser.name
//             }
//             : undefined;
//
//     return {
//         user,
//         userLoading,
//         userError,
//         refetch,
//     };
// }
