/* Cache only the app shell. Never intercept remote or local video/media. */
const CACHE = "mdn-tv-shell-v1";
const SHELL = ["./", "./index.html", "./app.js", "./styles.css", "./manifest.webmanifest", "./icon-192.png", "./icon-512.png"];
self.addEventListener("install",event=>{
  event.waitUntil(caches.open(CACHE).then(cache=>cache.addAll(SHELL)).then(()=>self.skipWaiting()));
});
self.addEventListener("activate",event=>{
  event.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(k=>k.startsWith("mdn-tv-shell-")&&k!==CACHE).map(k=>caches.delete(k)))).then(()=>self.clients.claim()));
});
self.addEventListener("fetch",event=>{
  const req=event.request;
  if(req.method!=="GET"||new URL(req.url).origin!==self.location.origin||
     req.destination==="video"||req.destination==="audio"||req.headers.has("range")) return;
  const url = new URL(req.url);
  // Static shell only. Do not cache APIs, viewer data, streams or user-provided media.
  const filename=url.pathname.split("/").pop();
  if(!["","index.html","app.js","styles.css","manifest.webmanifest","icon-192.png","icon-512.png"].includes(filename)) return;
  event.respondWith(fetch(req).then(res=>{
    if(res.ok) {
      const copy=res.clone();
      event.waitUntil(caches.open(CACHE).then(cache=>cache.put(req,copy)));
    }
    return res;
  }).catch(()=>caches.match(req).then(cached=>cached||caches.match("./index.html"))));
});