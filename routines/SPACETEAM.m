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
	NEW META,I
	KILL META
	SET META("authRequired")=0
	DO ADDM^MIOROUTE("GET","/","HOME^SPACETEAM",.META)
	DO ADDM^MIOROUTE("GET","/public/*path","STATIC^SPACETEAM",.META)
	DO ADDM^MIOROUTE("HEAD","/public/*path","STATIC^SPACETEAM",.META)
	DO ADDM^MIOROUTE("GET","/space-security","HOME^SPACETEAM",.META)
	DO ADDM^MIOROUTE("GET","/learn","ACADEMY^SPACETEAM",.META)
	DO ADDM^MIOROUTE("GET","/learn/foundations","ACADEMY^SPACETEAM",.META)
	DO ADDM^MIOROUTE("GET","/learn/reference","ACADEMY^SPACETEAM",.META)
	DO ADDM^MIOROUTE("GET","/learn/lab","ACADEMY^SPACETEAM",.META)
	DO ADDM^MIOROUTE("GET","/learn/lab/trees","ACADEMY^SPACETEAM",.META)
	DO ADDM^MIOROUTE("GET","/learn/lab/expressions","ACADEMY^SPACETEAM",.META)
	DO ADDM^MIOROUTE("GET","/learn/lab/flow","ACADEMY^SPACETEAM",.META)
	DO ADDM^MIOROUTE("GET","/learn/lab/memory","ACADEMY^SPACETEAM",.META)
	DO ADDM^MIOROUTE("GET","/learn/lab/routines","ACADEMY^SPACETEAM",.META)
	DO ADDM^MIOROUTE("GET","/learn/lab/construction","ACADEMY^SPACETEAM",.META)
	DO ADDM^MIOROUTE("GET","/learn/lab/strings","ACADEMY^SPACETEAM",.META)
	DO ADDM^MIOROUTE("GET","/learn/lab/patterns","ACADEMY^SPACETEAM",.META)
	DO ADDM^MIOROUTE("GET","/learn/lab/application","ACADEMY^SPACETEAM",.META)
	DO ADDM^MIOROUTE("GET","/learn/lab/reliability","ACADEMY^SPACETEAM",.META)
	FOR I=1:1:50 DO ADDM^MIOROUTE("GET","/learn/lesson/"_$TRANSLATE($JUSTIFY(I,2)," ","0"),"ACADEMY^SPACETEAM",.META)
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
ACADEMY(DEV,CONF,REQ,CTX)
	NEW TCTX,OUT,ERR,HEAD
	DO RENDER^MIOTPL("pages/space_security_academy.html",.CONF,.TCTX,.OUT,.ERR)
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
