SPACETEAM ; Space Security Team coming-soon landing page
 ;
 ; Optional public landing-page module for MUMPS.IO.
 ; Register with REG^SPACETEAM(.CONF) after INIT^MIOROUTE and
 ; before COMPILE^MIOROUTE. Public page: GET /space-security.
 ; No account, waitlist, or personal-data collection is implemented.
 ;
 QUIT
 ;
REG(CONF)
 NEW META
 KILL META
 SET META("authRequired")=0
 DO ADDM^MIOROUTE("GET","/space-security","HOME^SPACETEAM",.META)
 DO ADDM^MIOROUTE("GET","/public/space-security/*path","STATIC^SPACETEAM",.META)
 DO ADDM^MIOROUTE("HEAD","/public/space-security/*path","STATIC^SPACETEAM",.META)
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
 ; Isolated static mount; does not change the application's other mounts.
 SET CONF("server","static","mount")="/public/space-security"
 SET CONF("server","static","root")="public"
 DO STATIC^MIOSTATIC(.DEV,.CONF,.REQ,.CTX)
 QUIT
 ;
RESPERR(DEV,CONF,CTX,STATUS,CODE,MESSAGE)
 NEW OBJ
 SET OBJ("ok")=0,OBJ("error")=CODE,OBJ("message")=MESSAGE
 DO RESPJSONX^MIOHTTP(.DEV,.CONF,STATUS,.OBJ,$GET(CTX("request_id")),.CTX)
 QUIT
