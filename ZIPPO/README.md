# MDN TV replacement — portable prototype

A standalone, responsive **replacement viewer** for Media Data Network Television, built without credentials or access to the production servers.

## Run locally

Unzip and open `index.html` in a modern browser. For predictable behavior (especially local storage), optionally serve the directory with:

```bash
python3 -m http.server 8080
```

Then open `http://localhost:8080`.

There are no npm dependencies or build steps.

## Existing content connected

- `Meet Media Data Network` has a **direct hosted MP4** confirmed from the existing TV page.
- `AI in Action`, `Media Data Network Services Showcase`, and `Your next idea starts here` are listed but **do not have verified direct MP4 files** in this package. Their Watch pages link to the existing station. Obtain approved video URLs from current SecureVault management before replacing those links.
- `Autism Television` (`https://securevault.host/autismtv`) links to the existing separate channel center; it is not copied.
- The public site states no active live broadcast. Live TV is therefore deliberately marked **not verified** and does not pretend to stream.

## Working in this prototype

- Responsive navigation, channel discovery, video catalog, search and category filters.
- HTML5 playback controls for verified MP4 video, full-screen/theater, Next, and auto-next between verified hosted files.
- Browser-local favorites.
- Share links using URL hash navigation.
- Program guide with on-demand status, not fabricated airtimes.
- **Local Studio**: add, remove, import/export JSON catalog and reset demo. This is **not** a secure administrative dashboard and changes are **not shared** or published to production.

## Production integration checklist

1. Back up existing WordPress/MediaDataNetwork.com pages, SecureVault data, media and current broadcast URLs.
2. Determine ownership and actual source of `securevault.host`; do not change DNS yet.
3. Host this replacement on a separate staging address. Test all internal and external links.
4. Replace the prototype catalog with a single authorized read-only API and shared program IDs.
5. Connect to a **protected admin backend**. Use server-side login, authorization, input validation, audit trails and rights approval before publishing.
6. Retrieve verified direct hosted MP4/HLS URLs or YouTube embeds; confirm cross-origin playback and publication rights.
7. Use trusted, approved active YouTube Live video IDs or HLS streams to enable a LIVE status; never infer it from a saved URL alone.
8. Ensure all navigation and video embeds work on mobile and keyboard; test on modern desktop/mobile browsers.
9. Deploy TV playback to an approved location; update the MediaDataNetwork.com TV entry with the same branding and links. Preserve redirects and SEO.
10. PWA manifest, PNG icons, and a service worker are included. Installability requires HTTPS hosting and a supported browser. The service worker caches only the local app shell; it does not cache video files.
11. Deploy through GitHub/hosting with reviewed pull requests and rollback plan. This ZIP has **not** been deployed.

## Security and limitations

- No passwords, tokens, secret keys or private data are stored in this source.
- Local Studio is a demonstration of editing only. Never rely on browser localStorage for authenticated publishing.
- Do not point live production domains at this ZIP until full testing and real backend integration are complete.
- This project is **separate** from `mdn-ai-growth-saas`; no existing app has been overwritten.

Public reference locations: https://securevault.host/tv and https://mediadatanetwork.com/mdn-tv/
PWA learning: https://pwamobile.com/


## Staging publication (static hosting, without changing existing domains)

This is a **deployable starter**, not a deployed website.

Simple option: sign into [Netlify Drop](https://app.netlify.com/drop), unzip the provided archive, and drag the unzipped folder containing `index.html` into the drop area. Netlify should generate a temporary `*.netlify.app` HTTPS URL. Share that URL for inspection. Do not connect the production domains yet.

Alternative: create a new GitHub repository, upload these source files to its root, and link that repository to an approved static host (Cloudflare Pages, Netlify, etc). This package does not require npm or a build command.

### Checks performed
- JavaScript syntax validation: `node --check app.js` and `node --check sw.js` — passed.
- Local HTTP GET smoke test: index, stylesheet, application script, manifest, worker, and two icon files — HTTP 200.
- Visual/browser interaction test: **not completed** (headless browser executable missing in the test environment).
- Real external video playback and third-party links: **not independently validated**.
- PWA installation on an HTTPS staging domain: **not yet tested**.
- Publication to a publicly accessible staging domain: **not done**; requires hosting account authorization.

### Staging acceptance checklist
- Navigate Home, Watch TV, Live TV, Channels, Shows, News, Podcasts, Commercials, Guide, About, Local Studio.
- Play the verified video, test pause, volume, fullscreen, and return navigation. Verify mobile playback.
- Confirm remaining three program cards route correctly to the current station without claiming direct playback.
- Confirm Live TV does not present an unverified feed as currently live.
- Confirm browser reload works, install prompt is available where supported, and app shell loads offline.
- Verify that videos and private media are not stored by the service worker.
- Test keyboard navigation and both narrow and wide screens.
- Obtain video rights/URLs, protected publishing API, and data migration approval before any production cutover.
