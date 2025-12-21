import { mountWidget } from "./mountWidget";

class BookingSystemWidget extends HTMLElement {
    connectedCallback() {
        console.log('mounted')
        mountWidget(this);
    }
}

customElements.define("bookingsystem-widget", BookingSystemWidget);
