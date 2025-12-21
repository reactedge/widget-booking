import {createContext} from "react";
import type {EventState} from "./type.ts";

export const LocalEventStateContext = createContext<EventState | undefined>(undefined);