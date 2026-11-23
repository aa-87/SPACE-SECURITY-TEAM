# Space Security Team — coming-soon landing page

An optional, isolated MIOTPL landing page for the Space Security Team concept. It does not replace the existing SOUT landing page or the framework's default routes.

## Included files

- `templates/layouts/space_security_layout.html` — document shell, metadata, font loading, and stylesheet.
- `templates/pages/space_security_home.html` — Mustache-compatible landing page.
- `public/space-security/space-security.css` — responsive dark-only black/red editorial styling.
- `routines/SPACETEAM.m` — public page and isolated static-asset route handlers.

The page uses standard HTML/CSS and the MIOTPL `RENDERPAGE^MIOTPL` layout/page pattern. It does not require client-side JavaScript, a framework, external image assets, or Mustache extensions beyond the documented engine behavior.

## Register the routes

Load/link `SPACETEAM.m` with the other application routines. In the application bootstrap, register it after route initialization and before route compilation:

```mumps
D INIT^MIOROUTE
D START^MIOTPL(.CONF)
D REG^SPACETEAM(.CONF)
D COMPILE^MIOROUTE
```

If the application already initializes MIOROUTE and MIOTPL, add only `D REG^SPACETEAM(.CONF)` before its existing `COMPILE^MIOROUTE` call. The public page is `GET /space-security`; the stylesheet is served from `/public/space-security/space-security.css`.

The static handler uses an isolated `/public/space-security` mount rooted at `public`. It does not change the framework's global static mount. Keep this route registration alongside the application's existing modules; do not register it twice.

## Product and content decisions

- **Positioning:** a self-directed human-development project framed as a Milky Way / space-security training program.
- **First objective:** a cigarette-cessation field log, with future logging and progress visualization described as planned functionality.
- **Dashboard visual:** explicitly labeled demo data; no real tracker or calculations are implied.
- **MUMPS learning:** presented as an intellectual-training path and a way to build real software on the open-source MUMPS.IO foundation.
- **Cannabis:** the founder's personal-experiment premise is acknowledged, but the page does not endorse cannabis as a nicotine/addiction treatment. It calls out health and dependence risks and commits to distinguishing anecdote from evidence.
- **Privacy:** describes intended pseudonymous/data-minimal design. It explicitly avoids claiming HIPAA compliance or current readiness to store sensitive data.
- **No signup:** the page has no form, account creation, waitlist endpoint, or personal-data collection. This is intentional until the privacy/security model and backend are implemented.
- **Nonprofit intent:** describes a community-benefit ambition without claiming that a nonprofit entity has already been formed.

## Verification checklist

1. Confirm `SPACETEAM.m` is in the active MUMPS routine path and compiles in the target YottaDB/GT.M environment.
2. Register routes before `COMPILE^MIOROUTE` and verify `^MIO("ROUTE","COMPILE","ok")=1`.
3. Request `/space-security` and verify the rendered page is returned.
4. Request `/public/space-security/space-security.css` and verify `text/css` is returned.
5. Check the page at mobile and desktop widths, with keyboard navigation and reduced-motion preferences.
6. Before implementing accounts or a tracker, define threat model, data minimization, encryption, access control, auditability, retention/deletion, backup, incident response, and operational responsibilities. Do not describe the service as HIPAA compliant unless a qualified compliance review establishes that claim.

## MIOTPL reference

See [`docs/MIOTPL.md`](https://github.com/aa-87/mumps.io/blob/main/docs/MIOTPL.md) in the MUMPS.IO repository for template discovery, layout rendering, escaping, sections, and caching behavior.
