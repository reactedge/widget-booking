openssl req -x509 -nodes -newkey rsa:2048 \
-keyout widget.local.key \
-out widget.local.crt \
-days 365 \
-subj "/CN=widget.bookingsystem.co.uk"