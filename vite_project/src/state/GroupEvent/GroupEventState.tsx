import {createContext} from "react";
import type {EventState} from "./type.ts";

export const LocalGroupEventStateContext = createContext<EventState | undefined>(undefined);