import { createRoot } from "react-dom/client";
import StoreFinderWidget from "./StoreFinderWidget.tsx";
import { storeFinderStyles } from "./components/styles/store-finder.styles";
import {injectStyles} from "./lib/style.ts";

export function mountWidget(hostElement: HTMLElement) {
    // Create shadow DOM
    const shadow =
        hostElement.shadowRoot || hostElement.attachShadow({ mode: "open" });

    for (const css of storeFinderStyles) {
        injectStyles(shadow, css);
    }

    // Create React root inside shadow
    const root = createRoot(shadow);
    root.render(<StoreFinderWidget />);
}
