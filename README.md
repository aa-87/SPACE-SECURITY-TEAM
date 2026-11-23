# Space Security Team landing page

A coming-soon landing page built for the MIOTPL Mustache templating system in [aa-87/mumps.io](https://github.com/aa-87/mumps.io).

See [`docs/SPACE_SECURITY_LANDING_PAGE.md`](docs/SPACE_SECURITY_LANDING_PAGE.md) for installation and route registration.

## Quick integration

Copy the included `templates/`, `public/`, and `routines/SPACETEAM.m` files into the matching locations in your MUMPS.IO checkout. Register `REG^SPACETEAM(.CONF)` after `INIT^MIOROUTE` and before `COMPILE^MIOROUTE`. Then visit `/space-security`.

The existing SOUT files are not modified. This package intentionally contains no signup form or account flow; it collects no personal information.
