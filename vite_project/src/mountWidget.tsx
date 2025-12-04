import { createRoot } from "react-dom/client";
import StoreFinderWidget from "./StoreFinderWidget.tsx";

export function mountWidget(hostElement: HTMLElement) {
    // Create shadow DOM
    const shadow =
        hostElement.shadowRoot || hostElement.attachShadow({ mode: "open" });

    // Create React root inside shadow
    const root = createRoot(shadow);
    root.render(<StoreFinderWidget />);
}
