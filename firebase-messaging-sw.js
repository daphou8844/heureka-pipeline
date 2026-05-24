// ═══════════════════════════════════════════════════════════════════════
//  HEUREKA CHAT — Firebase Messaging Service Worker
//  Gère les notifications push en arrière-plan + cache PWA hors ligne.
//
//  ⚠️  CONFIGURATION REQUISE :
//  Copier la même config Firebase que dans chat.html (section FIREBASE_CONFIG).
//  Laisser 'REPLACE_ME' désactive Firebase tout en gardant le PWA fonctionnel.
// ═══════════════════════════════════════════════════════════════════════

importScripts('https://www.gstatic.com/firebasejs/10.12.2/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/10.12.2/firebase-messaging-compat.js');

const FIREBASE_CONFIG = {
  apiKey:            'REPLACE_ME',
  authDomain:        'REPLACE_ME.firebaseapp.com',
  projectId:         'REPLACE_ME',
  storageBucket:     'REPLACE_ME.appspot.com',
  messagingSenderId: 'REPLACE_ME',
  appId:             'REPLACE_ME'
};

// Init Firebase seulement si la config est remplie
if (FIREBASE_CONFIG.apiKey !== 'REPLACE_ME') {
  try {
    firebase.initializeApp(FIREBASE_CONFIG);
    const messaging = firebase.messaging();

    // ── Message FCM reçu quand l'app est en arrière-plan ────────────────
    messaging.onBackgroundMessage((payload) => {
      const title = (payload.notification && payload.notification.title) || 'Heureka Chat';
      const body  = (payload.notification && payload.notification.body)  || '';
      self.registration.showNotification(title, {
        body,
        icon:     '/heureka-pipeline/logo.png',
        badge:    '/heureka-pipeline/logo.png',
        tag:      'hchat',
        renotify: true,
        data:     Object.assign({ url: '/heureka-pipeline/chat.html' }, payload.data || {})
      });
    });
  } catch (e) {
    console.error('[SW] Firebase init failed:', e);
  }
}

// ── Clic sur notification → ouvrir ou focus l'app ──────────────────────
self.addEventListener('notificationclick', function(event) {
  event.notification.close();
  var targetUrl = (event.notification.data && event.notification.data.url)
    || '/heureka-pipeline/chat.html';
  event.waitUntil(
    clients.matchAll({ type: 'window', includeUncontrolled: true }).then(function(clientList) {
      for (var i = 0; i < clientList.length; i++) {
        var c = clientList[i];
        if (c.url.includes('chat.html') && 'focus' in c) return c.focus();
      }
      return clients.openWindow(targetUrl);
    })
  );
});

// ── Cache PWA pour usage hors ligne ───────────────────────────────────
var CACHE_NAME = 'hchat-v1';
var PRECACHE   = ['./chat.html', './config.js', './logo.png', './manifest.json'];

self.addEventListener('install', function(event) {
  self.skipWaiting();
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(function(cache) { return cache.addAll(PRECACHE); })
      .catch(function() { /* silencieux si offline à l'install */ })
  );
});

self.addEventListener('activate', function(event) {
  event.waitUntil(
    caches.keys().then(function(keys) {
      return Promise.all(
        keys.filter(function(k) { return k !== CACHE_NAME; })
            .map(function(k) { return caches.delete(k); })
      );
    })
  );
  self.clients.claim();
});

self.addEventListener('fetch', function(event) {
  if (event.request.method !== 'GET') return;
  var url = event.request.url;
  // Ne pas mettre en cache les requêtes externes (Google Sheets, fonts…)
  if (!url.startsWith(self.location.origin)) return;
  if (url.includes('script.google') || url.includes('googleapis') || url.includes('gstatic')) return;
  event.respondWith(
    caches.match(event.request).then(function(cached) {
      return cached || fetch(event.request);
    })
  );
});
