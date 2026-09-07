# Terrance Harden — Portfolio

Static portfolio site with a tiny Node server. Zero dependencies, no build step.

## Run locally

```
npm start
# → http://localhost:3000
```

## Deploy to Railway (about 5 minutes)

1. Push this folder to a GitHub repo (e.g. `terrance-portfolio`).
2. In Railway: **New Project → Deploy from GitHub repo** → pick the repo.
   Railway auto-detects Node and runs `npm start`. Nothing else to configure.
3. Once it's live, open the service → **Settings → Networking → Generate Domain** to get a
   `*.up.railway.app` URL.
4. **Custom domain:** in the same Networking panel click **Custom Domain**, enter your domain,
   then add the CNAME record Railway shows you at your registrar (if the domain is still with
   Squarespace Domains, do it under *Domains → DNS Settings* there).

Cost: this server idles at ~10 MB of RAM, so it lands well inside Railway's Hobby plan
($5/mo of included usage — typically under $1/mo actually consumed).

## Editing content

Everything is in **`public/data.js`** — bio, clients, services, social links, reels,
work items, and short-form Instagram posts. Add a new piece by appending to the `work` array:

```js
{ title: "New Spot", url: "https://youtu.be/XXXXXXXXXXX", cat: "motion", note: "Optional caption", featured: true }
```

- `cat` is one of `film`, `motion`, `video`.
- `featured: true` makes the tile double-width.
- YouTube and Vimeo links get thumbnails automatically. Instagram links open in a lightbox embed.
- To change the background hero video, set `heroVideo` to a YouTube ID.

Colors, type, and spacing live at the top of `public/styles.css` (`:root` variables).

## Files

```
server.js            zero-dep static server (PORT from env)
public/index.html    page structure
public/styles.css    design system + layout
public/app.js        rendering, filters, lightbox, hero video
public/data.js       ← all content
SQUARESPACE_INVENTORY.md   everything migrated from the old site
```
