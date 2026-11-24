# Space Security Team landing page [codename efuhair.com for now]

A coming-soon landing page built for the MIOTPL Mustache templating system in [aa-87/mumps.io](https://github.com/aa-87/mumps.io).

See [`docs/SPACE_SECURITY_LANDING_PAGE.md`](docs/SPACE_SECURITY_LANDING_PAGE.md) for installation and route registration.

## Quick integration

Copy the included `templates/`, `public/`, and `routines/SPACETEAM.m` files into the matching locations in your MUMPS.IO checkout. Register `REG^SPACETEAM(.CONF)` after `INIT^MIOROUTE` and before `COMPILE^MIOROUTE`. Then visit `/space-security`.

## Dealing with serving files:
Files are served from the public directory. The config below can be shared across different apps registered within the MIO.m routine. 
See Below
```
INIT(CONF)
	DO BOOTCONF(.CONF)
	DO INIT^MIOROUTE
	;DO START^MIOTPL(.CONF)
	;DO REG^MIOPLGD(.CONF)
	;DO REG^MIOHEALTH(.CONF)
	;DO REG^MIOERRC(.CONF)
	;DO REG^MIOOS(.CONF)
	SET CONF("server","static","enabled")=1
	;SET CONF("server","static","dirListing","enabled")=1
	SET CONF("server","static","root")="public"
	SET CONF("server","static","mount")="public"
	DO REG^MIOSTATIC(.CONF)
	DO REG^SPACETEAM(.CONF)
	DO COMPILE^MIOROUTE
	DO SYNCCONF(.CONF)
	DO START^MIOCLEAN(.CONF)
	QUIT
	;
```
