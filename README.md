# Space Security Team — landing page + Field Log 001
## https://chatgpt.com/share/6b05b6c1-0554-83e9-ac2e-c9c6238bdb8c


A MUMPS.IO / MIOTPL landing page plus a standalone, local-first cigarette-cessation field-log prototype.

## Included

- `templates/` — MIOTPL page and layout for the project overview.
- `public/space-security/space-security.css` — responsive landing-page styling.
- `public/space-security/tracker/index.html` — standalone tracker application (HTML, CSS, SVG and JavaScript in one file).
- `routines/SPACETEAM.m` — existing public landing-page and static-file routes.
- `docs/` — setup, product behavior, privacy boundaries, and verification notes.

## Quick integration

Copy `templates/`, `public/`, and `routines/SPACETEAM.m` into the matching locations in your MUMPS.IO checkout. Register `REG^SPACETEAM(.CONF)` after `INIT^MIOROUTE` and before `COMPILE^MIOROUTE`. Keep the application's existing static setup and route registrations.

The overview is `/space-security`. The standalone tracker is served by the existing static wildcard route at `/public/space-security/tracker/index.html`. It does not require a separate MUMPS route or MIOTPL template rendering.

## Standalone use

You can also open `public/space-security/tracker/index.html` directly in a modern browser. It has no build step, package manager, framework, remote API, font dependency, or external asset dependency.

## Important behavior and boundaries

- Dark and light themes are included.
- SVG graphics and a dynamically drawn craving chart are inline.
- Entries and baseline settings are stored in this browser's `localStorage` only. There is no account, server persistence, analytics, or sync.
- Users can export/import JSON and delete all local data.
- Tobacco/cannabis composition is a user-entered observation, not a recommended ratio or preparation guide. The application does not claim that smoked cannabis/tobacco is a proven cessation treatment or safe alternative.
- This is a personal tracking prototype, not medical advice, a clinical device, or a HIPAA-compliant service. Browser-local storage is not encrypted by this app; anyone with access to the same browser profile may be able to view the data.

The existing SOUT files are not included or modified.
