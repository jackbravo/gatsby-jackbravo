/**
 * Welcome to your Workbox-powered service worker!
 *
 * You'll need to register this file in your web app and you should
 * disable HTTP caching for this file too.
 * See https://goo.gl/nhQhGp
 *
 * The rest of the code is auto-generated. Please don't update this file
 * directly; instead, make changes to your Workbox build configuration
 * and re-run your build process.
 * See https://goo.gl/2aRDsh
 */

importScripts("workbox-v3.5.0/workbox-sw.js");
workbox.setConfig({modulePathPrefix: "workbox-v3.5.0"});

workbox.core.setCacheNameDetails({prefix: "gatsby-plugin-offline"});

workbox.skipWaiting();
workbox.clientsClaim();

/**
 * The workboxSW.precacheAndRoute() method efficiently caches and responds to
 * requests for URLs in the manifest.
 * See https://goo.gl/S9QRab
 */
self.__precacheManifest = [
  {
    "url": "webpack-runtime-0330d499aca92bb7afc6.js"
  },
  {
    "url": "app-49da708419aed98848c0.js"
  },
  {
    "url": "component---node-modules-gatsby-plugin-offline-app-shell-js-9255c99c42cdb85803b6.js"
  },
  {
    "url": "index.html",
    "revision": "b4a2899bce9b61f2a104e408bee1dd06"
  },
  {
    "url": "offline-plugin-app-shell-fallback/index.html",
    "revision": "6256368621f19481729f30a0d7f54aa1"
  },
  {
    "url": "0.58354b90ff96118c4cc1.css"
  },
  {
    "url": "1.9975055bf729176f2053.css"
  },
  {
    "url": "1-aa20b6e37e64eb9039d8.js"
  },
  {
    "url": "component---src-pages-index-js-7a5e07f4a21f029d348b.js"
  },
  {
    "url": "0-415577cd0b14c3a866c0.js"
  },
  {
    "url": "static/d/578/path---index-6a9-2gS0QRAgWnb3asSXQjuTxCnu7c.json",
    "revision": "4b7a3311dd33ea412a9fa6c2cb986376"
  },
  {
    "url": "component---src-pages-404-js-ba6273f0616d8847f849.js"
  },
  {
    "url": "static/d/164/path---404-html-516-62a-NZuapzHg3X9TaN1iIixfv1W23E.json",
    "revision": "c2508676a2f33ea9f1f0bf472997f9a0"
  },
  {
    "url": "static/d/520/path---offline-plugin-app-shell-fallback-a-30-c5a-NZuapzHg3X9TaN1iIixfv1W23E.json",
    "revision": "c2508676a2f33ea9f1f0bf472997f9a0"
  },
  {
    "url": "manifest.webmanifest",
    "revision": "cdbf4c26a0bb83f83bad2db03ddcf29a"
  }
].concat(self.__precacheManifest || []);
workbox.precaching.suppressWarnings();
workbox.precaching.precacheAndRoute(self.__precacheManifest, {});

workbox.routing.registerNavigationRoute("/offline-plugin-app-shell-fallback/index.html", {
  whitelist: [/^[^?]*([^.?]{5}|\.html)(\?.*)?$/],
  blacklist: [/\?(.+&)?no-cache=1$/],
});

workbox.routing.registerRoute(/\.(?:png|jpg|jpeg|webp|svg|gif|tiff|js|woff|woff2|json|css)$/, workbox.strategies.staleWhileRevalidate(), 'GET');
workbox.routing.registerRoute(/^https:/, workbox.strategies.networkFirst(), 'GET');
"use strict";

/* global workbox */
self.addEventListener("message", function (event) {
  var api = event.data.api;

  if (api === "gatsby-runtime-cache") {
    var resources = event.data.resources;
    var cacheName = workbox.core.cacheNames.runtime;
    event.waitUntil(caches.open(cacheName).then(function (cache) {
      return Promise.all(resources.map(function (resource) {
        return cache.add(resource).catch(function (e) {
          // ignore TypeErrors - these are usually due to
          // external resources which don't allow CORS
          if (!(e instanceof TypeError)) throw e;
        });
      }));
    }));
  }
});