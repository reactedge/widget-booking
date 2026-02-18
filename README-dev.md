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



these are my steps:
- start keystone on port 3000
- start oauth on port 3002
- start bride on port 3003
- widget lives on port 5173 locally
  --> keystone needs to be allowing the frontend to consume the APIs and the secret key needs to be present in both Keystone .env file and OAuth server too
  --> NODE_TLS_REJECT_UNAUTHORIZED should be set to 1 in production and 0 otherwise to allow self-signed certificates
  --> FRONTEND_HOST is the frontend url: localhost:5173 on local dev
  Keystone .env customisations
  FRONTEND_HOST=http://localhost:5173
  FRONTEND_PORT=5173
  KEYSTONE_SERVICE_TOKEN
  it is important security wise to validate keystone cannot be accessed from anywhere else but the frontend
  widget booking api : https://booking-api.local/api/graphql (if network tab does not show any graphql call, then the keystone url is either wrong or is setup by not allowing the frontend to access it)
- auth bridge need to be with the same site url: eg: mybooking.local, auth.mybooking.local

sed -i 's/local/southerndemo.com/g' auth-bridge.southerndemo.conf

Access to fetch at 'https://auth-bridge.southerndemo.com/auth/login' from origin 'https://southerndemo.com' has been blocked by CORS policy: 
Response to preflight request doesn't pass access control check: No 'Access-Control-Allow-Origin' header is present on the requested resource.

cd /var/www/oauth-express
pm2 start npm --name auth-bridge -- run start:prod

# auth-bridge
cd /var/www/auth-bridge
pm2 start npm --name oauth-express -- run start:prod