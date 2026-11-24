SPACETEAM ; Space Security Team coming-soon landing page
	;#################################################################
	;#                                                               #
	;# Copyright (c) 2027 EFUZY LLC [not registered yet. DON8 plz]   #
	;# and/or its subsidiaries.  All rights reserved.                #
	;#                                                               #
	;#   This source code contains the intellectual property         #
	;#   of its copyright holder(s), and is made available           #
	;#   under a license.  If you do not know the terms of           #
	;#   the license, please stop and do not read further.           #
	;#                                                               #
	;#################################################################	
	;
	; Optional public landing-page module for MUMPS.IO.;
	; Register with REG^SPACETEAM(.CONF) after INIT^MIOROUTE and
	; before COMPILE^MIOROUTE. Public page: GET /.;
	; No account, waitlist, or personal-data collection is implemented.;
	;
	QUIT
	;
REG(CONF)
	NEW META
	KILL META
	SET META("authRequired")=0
	DO ADDM^MIOROUTE("GET","/","HOME^SPACETEAM",.META)
	DO ADDM^MIOROUTE("GET","/public/*path","STATIC^SPACETEAM",.META)
	DO ADDM^MIOROUTE("HEAD","/public/*path","STATIC^SPACETEAM",.META)
	DO ADDM^MIOROUTE("GET","/space-security","HOME^SPACETEAM",.META)
	QUIT
	;
HOME(DEV,CONF,REQ,CTX)
	NEW TCTX,OUT,ERR,HEAD
	KILL TCTX,ERR
	DO RENDERPAGE^MIOTPL("pages/space_security_home.html","layouts/space_security_layout.html",.CONF,.TCTX,.OUT,.ERR)
	IF $DATA(ERR) DO RESPERR(.DEV,.CONF,.CTX,500,"template_error",$GET(ERR("error"),"render_failed")) QUIT
	SET HEAD("Content-Type")="text/html; charset=utf-8"
	DO RESPX^MIOHTTP(.DEV,.CONF,200,.HEAD,OUT,$GET(CTX("request_id")),.CTX)
	QUIT
	;
STATIC(DEV,CONF,REQ,CTX)
	; The /public/*path route captures the path relative to /public.
	; MIOSTATIC joins that relative path to this filesystem root.
	; Keep the mount/root pair aligned: /public -> ./public.
	; This serves /public/space-security/... as public/space-security/...
	; without changing the global MIOSTATIC configuration or other mounts.
	SET CONF("server","static","mount")="/public"
	SET CONF("server","static","root")="public"
	DO STATIC^MIOSTATIC(.DEV,.CONF,.REQ,.CTX)
	QUIT
	;
RESPERR(DEV,CONF,CTX,STATUS,CODE,MESSAGE)
	NEW OBJ
	SET OBJ("ok")=0,OBJ("error")=CODE,OBJ("message")=MESSAGE
	DO RESPJSONX^MIOHTTP(.DEV,.CONF,STATUS,.OBJ,$GET(CTX("request_id")),.CTX)
	QUIT
	;
