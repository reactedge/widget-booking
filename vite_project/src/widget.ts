import { mountWidget } from "./mountWidget";

class StoreFinderWidget extends HTMLElement {
    connectedCallback() {
        mountWidget(this);
    }
}

customElements.define("storefinder-widget", StoreFinderWidget);
