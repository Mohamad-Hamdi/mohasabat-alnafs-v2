// ملف Service Worker للتعامل مع الإشعارات في الخلفية
self.addEventListener('install', (event) => {
    self.skipWaiting();
});

self.addEventListener('activate', (event) => {
    event.waitUntil(self.clients.claim());
});

// الاستماع لحدث الضغط على الإشعار لفتح التطبيق
self.addEventListener('notificationclick', (event) => {
    event.notification.close();
    event.waitUntil(
        clients.matchAll({ type: 'window' }).then(windowClients => {
            // لو التطبيق مفتوح في الخلفية، اعمل له فوكس
            for (var i = 0; i < windowClients.length; i++) {
                var client = windowClients[i];
                if (client.url.indexOf('/') !== -1 && 'focus' in client) {
                    return client.focus();
                }
            }
            // لو التطبيق مقفول تماماً، افتحه
            if (clients.openWindow) {
                return clients.openWindow('/');
            }
        })
    );
});