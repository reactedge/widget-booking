# Booking System Widget

A **decoupled, embeddable booking widget** delivered as a single versioned JavaScript file.  
It can be embedded into **WordPress, Magento, or static sites** and communicates with a Keystone backend.

The widget is designed for **isolation, determinism, and flexible reuse** across different use cases and industries.

---

## What this repository contains

- Frontend booking widget source
- Build pipeline producing `widget-*.iife.js`
- Public embedding contract (custom element + data attributes)
- Local development setup for the widget

---

## What this repository does NOT contain

- Backend (Keystone) configuration
- Server, Nginx, TLS, pm2, or deployment setup
- CMS theme code (WordPress, Magento)
- Infrastructure or operations scripts

---

## Usage

Embed the widget by including the custom element and pointing it to a **versioned script URL**:

```html
<bookingsystem-widget
  data-src="https://widgets.example.com/widget-booking-system@X.Y.Z.iife.js"
  data-page="request-an-appointment"
></bookingsystem-widget>
