import { mountWidget } from "./mountWidget";

class BookingSystemWidget extends HTMLElement {
    connectedCallback() {
        mountWidget(this);
    }
}

customElements.define("bookingsystem-widget", BookingSystemWidget);
