import { mountWidget } from "./mountWidget";

class StoreFinderWidget extends HTMLElement {
    connectedCallback() {
        console.log('mounted')
        mountWidget(this);
    }
}

customElements.define("storefinder-widget", StoreFinderWidget);
