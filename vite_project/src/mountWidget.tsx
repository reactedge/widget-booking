import { createRoot } from "react-dom/client";
import {BookingSystemWidget} from "./BookingSystemWidget.tsx";
import {injectStyles} from "./lib/style.ts";
import {bookingSystemStyles} from "./styles/booking-system.styles.ts";

export function mountWidget(hostElement: HTMLElement) {
    // Create shadow DOM
    const shadow =
        hostElement.shadowRoot || hostElement.attachShadow({ mode: "open" });

    for (const css of bookingSystemStyles) {
        injectStyles(shadow, css);
    }

    // Create React root inside shadow
    const root = createRoot(shadow);
    root.render(<BookingSystemWidget />);
}
