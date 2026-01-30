import {type ReactNode, useCallback} from "react";
import { useImmer } from "use-immer";
import {LocalGroupEventStateContext} from "./GroupEventState.tsx";
import type {GroupEventInfoState} from "./type.ts";
import {groupEventHash} from "../../domain/event/getGroupEventStatus.ts";

const LocalStateProvider = LocalGroupEventStateContext.Provider;

const intialState: GroupEventInfoState = {
    activeGroupEventHash: ''
}

interface GroupEventStateProviderProps {
    children: ReactNode;
}

export const GroupEventStateProvider: React.FC<GroupEventStateProviderProps> = ({ children }) => {
    const [state, setState] = useImmer<GroupEventInfoState>(intialState);

    const toggleActiveGroupEvent = useCallback((eventIds: string[]) => {
        const hash = groupEventHash(eventIds);
        setState(draft => {
            draft.activeGroupEventHash = hash;
        });
    }, [setState]);

    const resetActiveGroupEvent = useCallback(() => {
        setState(draft => { draft.activeGroupEventHash = undefined });
    },[setState]);

    return <LocalStateProvider
        value={{
            resetActiveGroupEvent,
            toggleActiveGroupEvent,
            groupEventState: state
        }}
    >{children}</LocalStateProvider>
}
