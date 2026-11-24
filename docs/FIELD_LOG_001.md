# Field Log 001 — standalone cessation tracker

## Where it lives

`public/space-security/tracker/index.html` is intentionally a standalone document. It does not use MIOTPL, a frontend framework, a bundler, external images, remote fonts, or third-party JavaScript. Open the file directly for local use, or serve it through the existing MUMPS.IO static wildcard route:

`/public/space-security/tracker/index.html`

The current `SPACETEAM.m` route registration already includes `GET` and `HEAD /public/space-security/*path`, so no additional route or routine is required for the tracker file. The landing page now links to the standalone field log.

## Features in this milestone

- Dark and light themes; theme choice is persisted locally.
- Inline SVG identity mark, orbital illustration, event icons, composition visualization, and dynamic craving chart.
- Event types: cigarette smoked, tobacco + cannabis use, craving/urge, smoke-free milestone, and other observation.
- Date/time, cigarette count, optional craving intensity, trigger/context, and free-text notes.
- For tobacco + cannabis events, user-entered tobacco and cannabis shares that must total 100%. This is strictly retrospective logging of a user's own chosen proportions. The interface does not suggest a target ratio, provide mixing instructions, or describe the method as medically validated.
- Baseline profile for usual cigarettes/day, tracking start date, and personal focus.
- Recent event history, self-reported cigarette count, average recorded craving intensity, and chart of logged craving events.
- JSON export/import and explicit local-data deletion.
- Responsive layout, keyboard-accessible controls, reduced-motion handling, and no network calls from the application.

## Data model

The app stores one JSON object under `sst.fieldlog.v1` in browser `localStorage`:

- `entries[]`: `id`, `type`, `when`, `quantity`, `craving`, `trigger`, `notes`; blend entries additionally include `tobaccoPct` and `cannabisPct`.
- `profile`: `baseline`, `startDate`, `goal`.
- `theme`: `dark` or `light`.

The data is not sent to the MUMPS.IO server. This is intentionally a local-only prototype. Clearing browser site data, using another browser/profile/device, or private browsing may make records unavailable. Export JSON periodically if you want a portable copy. Exported files may contain sensitive information and should be stored securely.

## Interpretation and harm-reduction boundaries

The founder's personal experience with a tobacco/cannabis substitution or tapering experiment is treated as a legitimate personal observation and can be documented in the log. The application does not prescribe a mixture, set a target, optimize a ratio, or claim causation. A user's experience is important but is not evidence that a method is safe or generally effective. Both tobacco and cannabis smoke expose users to combustion products; tobacco continues nicotine exposure and cannabis has separate health and dependence risks. The application is a recordkeeping tool, not a treatment recommendation. Qualified cessation support and evidence-based options should remain available to users.

## Privacy and security limits

This version has no accounts, cookies, server-side storage, analytics, telemetry, or network sync. However, `localStorage` is not encrypted by this app. Other people with access to the same browser profile/device may be able to access the entries. Browser extensions and device compromise are outside this prototype's protection. Do not treat it as suitable for storing highly sensitive information on a shared or unmanaged device. There is no HIPAA compliance claim.

Before any multi-user or server-backed version, design and review authentication, authorization, encryption in transit/at rest, key management, audit logs, data retention/deletion, backups, incident response, consent, threat model, and applicable legal/compliance requirements.

## Verification

1. Open `public/space-security/tracker/index.html` directly in a modern browser.
2. Switch between dark and light themes and reload to confirm theme persistence.
3. Add a cigarette event, a craving event, and a blend observation with shares totaling 100%.
4. Confirm the chart and summary metrics update from entered data only.
5. Export JSON, clear local data, import the export, and verify the entries return.
6. Inspect browser devtools Network: the tracker should make no network requests.
7. Test keyboard navigation, narrow viewport layout, and reduced-motion preference.

No live YottaDB/MUMPS server test was possible as part of this package build. The tracker itself is a static file and does not require routine compilation.
