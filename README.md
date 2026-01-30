# Booking System Widget

A booking flow designed to work under hostile embedding constraints — where modals, global state, and platform control are unavailable.

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
- OAuth provider setup or secrets
- Server or infrastructure configuration (Nginx, TLS, pm2, etc.)
- CMS theme or template code (WordPress, Magento)
- Deployment or operations scripts
---

## Usage

Embed the widget by including the custom element and pointing it to a **versioned script URL**:

```html
<div class="booking-system">
    <bookingsystem-widget
            data-load="eager"
            data-src="https://widgets.example.com/widget-booking-system@X.Y.Z.iife.js"
            data-page="request-an-appointment"
            data-venue="green-edge"
    ></bookingsystem-widget>
</div>

<script type="application/json" id="reactedge-config">
    {
        "widgets": {
            "booking": {
                "api": "https://<keystone-url>/api/graphql/"
            }
        },
        "integrations": {
            "cloudflare": {
                "siteKey": "..."
            }
        }
    }
</script>

<div id="security-gate" class="hidden">
    <div class="security-veil"></div>
    <div id="booking-turnstile"></div>
</div>
```

## Design goals

This widget is intentionally designed around the following constraints:
No control over the host DOM or global layout
No reliance on modals, overlays, or z-index stacking
Linear, state-driven UX (login → booking → action)
Security checks applied to business mutations, not navigation
The implementation favours determinism, isolation, and recoverable UI states over visual complexity.

## Roadmap
This repository is published before feature-completion to document architectural decisions in public.

Planned work includes:
- OAuth integration (credential → token handoff already designed)
- Step-up authentication after repeated login failure
- Turnstile token reuse across booking flow
- Expanded Playwright coverage on abuse scenarios
- Playwright tests focused on core flow integrity  