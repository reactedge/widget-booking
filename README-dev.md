openssl req -x509 -nodes -newkey rsa:2048 \
-keyout widget.local.key \
-out widget.local.crt \
-days 365 \
-subj "/CN=widget.bookingsystem.co.uk"


<div class="booking-system">
    <bookingsystem-widget
            data-load="eager"
            data-page="request-an-appointment"
            data-src="https://widget-bookingsystem.reactedge.net/widget-booking-sytem.iife.js"
    ></bookingsystem-widget>
</div>

<div id="security-gate" class="hidden">
    <div class="security-veil"></div>
    <div id="booking-turnstile"></div>
</div>

https://widget.bookingsystem.co.uk:8448/widget-contact-us.iife.js
rsync -arvgot docker_bookingsystem/www/ root@<host>:/var/www/docker_bookingsystem/www/


rsync -arvgot --exclude=".git" --exclude="node_modules" --exclude="build" --exclude=".keystone"  keystone-backend root@18.175.100.27:/var/www/keystone/

`server {
listen 80;
server_name keystone.reactedge.net;

    location / {
        proxy_set_header   X-Forwarded-For $remote_addr;
        proxy_set_header   Host $http_host;
        proxy_pass         "http://127.0.0.1:3000";
    }
}`

apt install npm
npm install -g pm2



