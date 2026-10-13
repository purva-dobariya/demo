# nginx performance config (one-time manual step)

The live server (nginx on EC2, `/var/www/app`) sends
`Cache-Control: no-store, no-cache, must-revalidate, max-age=0` on **every** response,
gzips only HTML, and speaks HTTP/1.1. Measured 2026-09-07. That means every page view
re-downloads the footer artwork, fonts, CSS and every logo, and 30+ image requests queue
six at a time.

The nginx config is not in this repo and the deploy workflow only runs `git pull`, so this
is applied by hand once on the box (both the `main` and `release` instances):

```bash
sudo cp /var/www/app/deploy/nginx/ondc-perf.conf /etc/nginx/conf.d/ondc-perf.conf
sudo nano /etc/nginx/sites-enabled/<site>       # the file with server_name ondc.org
```

In that `server { }` block:

1. Delete the `add_header Cache-Control "no-store, ..."` line and the `add_header Pragma` line.
2. Add in their place: `add_header Cache-Control $ondc_cache_control always;`
3. Change `listen 443 ssl;` to `listen 443 ssl http2;` (both IPv4 and IPv6 lines if present).
4. If the server block or `nginx.conf` already has its own `gzip` lines, delete them so the
   snippet's apply (nginx takes the innermost setting, and a bare `gzip on` without
   `gzip_types` is why CSS shipped uncompressed).

5. Add a custom 404 page so unmatched URLs show ONDC's own "Page not found" page instead of
   nginx's bare default error page:
   ```nginx
   error_page 404 /404.html;
   ```
   Place it inside the same `server { }` block, anywhere alongside the other directives. It
   points at `/var/www/app/404.html` (the `root` the block already serves from), keeps the
   response status at `404` (nginx does this by default unless you add `=200`), and needs no
   extra `location` block. Applies to both the `main` and `release` instances, same as the rest
   of this file.

Then:

```bash
sudo nginx -t && sudo systemctl reload nginx
```

## Verify

```bash
curl -sI https://ondc.org/src/styles/beckn.css -H 'Accept-Encoding: gzip' | grep -iE 'cache-control|content-encoding'
#   Cache-Control: public, max-age=86400, must-revalidate
#   Content-Encoding: gzip
curl -sI https://ondc.org/public/assets/hero/d2c-brands.jpg | grep -i cache-control
#   Cache-Control: public, max-age=31536000, immutable
curl -sI https://ondc.org/ | grep -iE 'cache-control|x-frame|content-security'
#   HTML: max-age=300, and the security headers are still present
curl -sI https://ondc.org/this-page-does-not-exist
#   HTTP/1.1 404 (or HTTP/2 404), body is the ONDC 404.html, not nginx's default error page
```

In Chrome DevTools, Network tab, the Protocol column should read `h2`.

## Cache rule for editors

Images are cached for a year **by file name**. To replace an image, give the new file a new
name (or a suffix like `-v2`) and update the reference; overwriting in place will not show for
returning visitors until their cache expires. CSS/JS revalidate daily and HTML every 5 minutes,
so those can be edited in place.
