import { createRoot } from "react-dom/client";
import {BookingSystemWidget} from "./BookingSystemWidget.tsx";
import {activity} from "../activity";
import {getMountedHost} from "./lib/hostReader.ts";

export const WIDGET_ID = 'booking';

export function mountWidget(hostElement: HTMLElement) {
    const mountedHost = getMountedHost(hostElement);

    activity('bootstrap', 'Widget mounted', {
        hostElement
    });

    // Create React root inside shadow
    const root = createRoot(mountedHost);
    root.render(<BookingSystemWidget host={hostElement}/>);
}
