import { createRoot } from "react-dom/client";
import {BookingSystemWidget} from "./BookingSystemWidget.tsx";
import {activity} from "../activity";
import {getMountedHost} from "./lib/hostReader.ts";
import {ensureGlobalStyle} from "./lib/style.ts";

export function mountWidget(hostElement: HTMLElement) {
    const mountedHost = getMountedHost(hostElement);

    ensureGlobalStyle('reactedge-booking-css', '/widget/booking.css');

    activity('bootstrap', 'Widget mounted', {
        hostElement
    });

    // Create React root inside shadow
    const root = createRoot(mountedHost);
    root.render(<BookingSystemWidget host={hostElement} />);
}
