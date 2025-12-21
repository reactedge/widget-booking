import {type ReactNode, useCallback, useEffect} from "react";
import { useImmer } from "use-immer";
import type {ConfigInfoState} from "./type.ts";
import {LocalConfigStateContext} from "./ConfigState.tsx";
import type {EventHostIds, Venue} from "../../types/domain/types.ts";

interface ConfigStateProviderProps {
    children: ReactNode;
    config: ConfigInfoState;
}

const LocalStateProvider = LocalConfigStateContext.Provider;

export const ConfigStateProvider: React.FC<ConfigStateProviderProps> = ({ children, config }) => {
    const [state, setState] = useImmer<{ config: ConfigInfoState }>({
        config
    });

    // ✅ Keep state in sync with `localStorage` (Fixes Next.js navigation reset issue)
    useEffect(() => {
        if (typeof window !== "undefined") {
            localStorage.setItem("bookingSystemConfig", JSON.stringify(state.config));
        }
    }, [state.config]);

    const updateConfig = useCallback(
        <K extends keyof ConfigInfoState>(
            key: K,
            value: ConfigInfoState[K]
        ) => {
            setState(draft => {
                draft.config[key] = value;
            });
        },
        [setState]
    );

    const setVenue = useCallback((value: Venue) => {
        updateConfig("venue", value);
    }, [updateConfig]);

    const setEventHosts = useCallback((value: EventHostIds) => {
        updateConfig("eventHosts", value);
    }, [updateConfig]);

    return (
        <LocalStateProvider
            value={{
                setVenue,
                setEventHosts,
                config: state.config,
            }}
        >
            {children}
        </LocalStateProvider>
    );
};
