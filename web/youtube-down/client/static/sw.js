importScripts('/_nuxt/workbox.4c4f5ca6.js')

workbox.precaching.precacheAndRoute([
  {
    "url": "/_nuxt/0d9171acba145fcdcd73.css",
    "revision": "313081a2e4a89f7a8dd8151f6c720131"
  },
  {
    "url": "/_nuxt/215a30aec6442c1b935c.js",
    "revision": "cd7e74b86316ece9b2d2a9e9006db537"
  },
  {
    "url": "/_nuxt/4c1ab559772f7a33f2e5.js",
    "revision": "10fcc68340f51111197d22ab4d922acb"
  },
  {
    "url": "/_nuxt/90c2fc296425e78fad11.js",
    "revision": "77e2322a77a5ce797a8fc9e7758f8991"
  },
  {
    "url": "/_nuxt/a6794118365eed2ecb15.css",
    "revision": "cbeffb95e9e171036fe957213ba15cac"
  },
  {
    "url": "/_nuxt/b0e2d5bea99bd82220b5.js",
    "revision": "aa7a1843c606df3b78fceca71f48a338"
  },
  {
    "url": "/_nuxt/b5f7982e0afb054e1b86.js",
    "revision": "1ec197ab5975ed22728d05f85cb2da4b"
  },
  {
    "url": "/_nuxt/c17e60796e84ff086697.css",
    "revision": "98414d0e8f73307001ec0ce4810c21f7"
  },
  {
    "url": "/_nuxt/da6af835022fdce6578b.css",
    "revision": "5f0ac8bcc1ef180e4ced423ff376ed48"
  },
  {
    "url": "/_nuxt/dc516c8ec9cde36046d0.js",
    "revision": "9df3bfe9f7c420c404d31ac1a175a140"
  },
  {
    "url": "/_nuxt/e8114612eb1549446b8b.js",
    "revision": "91f63585be93124ac1f2348270c2ad35"
  },
  {
    "url": "/_nuxt/fff12c516cc28c2a9aa3.js",
    "revision": "a34e0468f7ac4d3dc8dd13e93f8f879d"
  }
], {
  "cacheId": "youtube-down",
  "directoryIndex": "/",
  "cleanUrls": false
})

workbox.clientsClaim()
workbox.skipWaiting()

workbox.routing.registerRoute(new RegExp('/_nuxt/.*'), workbox.strategies.cacheFirst({}), 'GET')

workbox.routing.registerRoute(new RegExp('/.*'), workbox.strategies.networkFirst({}), 'GET')
