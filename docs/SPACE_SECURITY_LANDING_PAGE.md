# Space Security Team — coming-soon landing page

An optional, isolated MIOTPL landing page for the Space Security Team concept. It does not replace the existing SOUT landing page or the framework's default routes.

## Included files

- `templates/layouts/space_security_layout.html` — document shell, metadata, font loading, and stylesheet.
- `templates/pages/space_security_home.html` — Mustache-compatible landing page.
- `public/space-security/space-security.css` — responsive editorial/dashboard styling with dark/light themes.
- `public/space-security/dashboard.js` — read-only controller for combined local tracker summaries and activity.
- `routines/SPACETEAM.m` — public page and isolated static-asset route handlers.

The page uses standard HTML/CSS and the MIOTPL `RENDERPAGE^MIOTPL` layout/page pattern. The dashboard uses a small framework-free JavaScript asset; it requires no external JavaScript libraries, image assets, or Mustache extensions beyond the documented engine behavior.

## Register the routes

Load/link `SPACETEAM.m` with the other application routines. In the application bootstrap, register it after route initialization and before route compilation:

```mumps
D INIT^MIOROUTE
D START^MIOTPL(.CONF)
D REG^SPACETEAM(.CONF)
D COMPILE^MIOROUTE
```

If the application already initializes MIOROUTE and MIOTPL, add only `D REG^SPACETEAM(.CONF)` before its existing `COMPILE^MIOROUTE` call. The public landing page is `GET /`; `/space-security` remains a legacy alias. The stylesheet is served from `/public/space-security/space-security.css`.

The deployed static handler uses the confirmed working MIOSTATIC configuration: `CONF("server","static","mount")="/public"` and `CONF("server","static","root")="public"`. The `/public/*path` route serves all nested public assets. Preserve this exact mount/root pair and do not add a competing `/public/space-security/*path` handler. Keep the route registration alongside the application's existing modules; do not register it twice.

## Product and content decisions

- **Positioning:** a self-directed human-development project framed as a Milky Way / space-security training program.
- **First objective:** a cigarette-cessation field log, with future logging and progress visualization described as planned functionality.
- **Dashboard:** the root page reads both local field logs and shows live summaries and a combined activity feed. The older chart illustration remains clearly labeled as a visual example.
- **MUMPS learning:** presented as an intellectual-training path and a way to build real software on the open-source MUMPS.IO foundation.
- **Cannabis:** the founder's personal-experiment premise is acknowledged, but the page does not endorse cannabis as a nicotine/addiction treatment. It calls out health and dependence risks and commits to distinguishing anecdote from evidence.
- **Privacy:** describes intended pseudonymous/data-minimal design. It explicitly avoids claiming HIPAA compliance or current readiness to store sensitive data.
- **No signup:** the page has no form, account creation, waitlist endpoint, or personal-data collection. This is intentional until the privacy/security model and backend are implemented.
- **Nonprofit intent:** describes a community-benefit ambition without claiming that a nonprofit entity has already been formed.

## Verification checklist

1. Confirm `SPACETEAM.m` is in the active MUMPS routine path and compiles in the target YottaDB/GT.M environment.
2. Register routes before `COMPILE^MIOROUTE` and verify `^MIO("ROUTE","COMPILE","ok")=1`.
3. Request `/` and verify the rendered page is returned (the `/space-security` alias may also be checked).
4. Request `/public/space-security/space-security.css` and verify `text/css` is returned.
5. Check the page at mobile and desktop widths, with keyboard navigation and reduced-motion preferences.
6. Before implementing accounts or a tracker, define threat model, data minimization, encryption, access control, auditability, retention/deletion, backup, incident response, and operational responsibilities. Do not describe the service as HIPAA compliant unless a qualified compliance review establishes that claim.

## MIOTPL reference

See [`docs/MIOTPL.md`](https://github.com/aa-87/mumps.io/blob/main/docs/MIOTPL.md) in the MUMPS.IO repository for template discovery, layout rendering, escaping, sections, and caching behavior.


## Root URL and Field Log 002 update

The canonical landing page is `GET /`. The existing `GET /space-security` route remains a legacy alias. The overview links to Field Log 001 at `/public/space-security/tracker/index.html` and Field Log 002 at `/public/space-security/breath-log/index.html`.

Field Log 002 is implemented as a standalone offline/local-only duration observation log. It accepts retrospective duration entries and provides history, JSON export/import, and deletion. It intentionally omits a live hold timer, countdown, targets, coaching, and performance prompts. Its safety notice explains fainting and drowning risks and warns against water, driving, standing, practicing alone, and hyperventilation. The founder's leg-injury recovery experience is identified as personal context, not evidence of cardiovascular benefit.


## Static asset routing: important mount/root pairing

The Space Security static handler uses the existing catch-all route `/public/*path`. The handler sets:

```mumps
SET CONF("server","static","mount")="/public"
SET CONF("server","static","root")="public"
DO STATIC^MIOSTATIC(.DEV,.CONF,.REQ,.CTX)
```

This pairing is intentional. `MIOSTATIC` removes the URL mount (`/public`) and joins the remaining relative path to the filesystem root (`public`). Therefore:

- `/public/space-security/space-security.css` maps to `public/space-security/space-security.css`.
- `/public/space-security/tracker/index.html` maps to `public/space-security/tracker/index.html`.
- `/public/space-security/breath-log/index.html` maps to `public/space-security/breath-log/index.html`.

Do not set the root to `public` while setting the mount to `/public/space-security`: that strips the `space-security` directory from the URL path and produces the wrong filesystem path. Avoid registering a second overlapping `/public/space-security/*path` handler; the single `/public/*path` route already serves all nested public assets.

## Copying this project into a MUMPS.IO checkout

The repository includes `scripts/sync-to-mumpsio.sh`. From the Space Security Team checkout, run:

```bash
chmod +x scripts/sync-to-mumpsio.sh
./scripts/sync-to-mumpsio.sh ../mumps.io
```

Pass an absolute path instead if the MUMPS.IO checkout is elsewhere. The script copies the Space Security routine, templates, static assets, and relevant docs into their matching MUMPS.IO directories. It deliberately does not overwrite MUMPS.IO's top-level README or other application files.

After copying, register the module and rebuild the route table in your MUMPS.IO startup flow:

```mumps
D INIT^MIOROUTE
D START^MIOTPL(.CONF)
D REG^SPACETEAM(.CONF)
D COMPILE^MIOROUTE
```

The `SPACETEAM` registration provides `GET /` for the landing page and `GET/HEAD /public/*path` for static files. If the module is already registered by the application, do not register it a second time.


## Confirmed deployment configuration

The user has confirmed that the following exact MIOSTATIC configuration is working in the live deployment at https://efuhair.com. Keep this pair unchanged in future work unless the static URL structure or filesystem layout is intentionally redesigned:

```mumps
SET CONF("server","static","mount")="/public"
SET CONF("server","static","root")="public"
```

The deployment is intentionally presented under the codename URL `https://efuhair.com` for an added level of obscurity.


## Unified local command dashboard

The root landing page now includes a live command dashboard that reads the two existing browser-local tracker stores without changing either data format:

- Cessation tracker: `localStorage["sst.fieldlog.v1"]`, with entries in `state.entries`.
- Breath observation log: `localStorage["sst.breathlog.v1"]`, an array of observation records.

The dashboard presents cigarette-entry quantity totals, average recorded craving intensity, breath observation count and latest recorded duration, combined record totals, and a filterable recent activity feed. These are summaries of user-entered records, not medical conclusions, cessation outcomes, or breath-hold performance recommendations.

The dashboard is read-only. It does not modify or merge the source records, upload them, or require an account. Both logs remain independently usable at their existing URLs. Browser storage events refresh the dashboard when a separate same-origin tab writes to either store; returning to the dashboard or using its refresh control also reloads data.

The dashboard, cessation tracker, and breath observation log use the shared theme preference `sst.landing.theme`. Existing tracker data keys and schemas are preserved. Browser local storage is origin- and profile-specific: records stored under another hostname, subdomain, protocol, or browser profile are not automatically shared. Use each tool's JSON export/import features for manual backup or transfer.

The breath-observation feed remains descriptive only. It does not rank durations, set targets, coach breath-holding, or provide medical advice.
