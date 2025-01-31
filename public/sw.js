// Listen for the 'push' event
self.addEventListener('push', event => {
    // Check if the push event contains data
    if (event.data) {
        const data = event.data.json();

        // Define options for the notification
        const options = {
            body: data.body || 'This is a default notification body.',
            icon: data.icon || '/default-icon.png', // Path to the notification icon
            image: data.image || null, // Path to a larger image for rich notifications
            badge: data.badge || '/default-badge.png', // Path to badge icon
            actions: data.actions || [], // Notification actions (e.g., buttons)
            vibrate: [200, 100, 200], // Vibration pattern
            tag: data.tag || 'default-tag', // Tag to identify the notification
            data: data.url || '/', // Custom data, typically a URL
        };

        // Show the notification
        event.waitUntil(
            self.registration.showNotification(data.title || 'Default Title', options)
        );
    } else {
        console.error('Push event but no data!');
    }
});

// Handle notification click event
self.addEventListener('notificationclick', event => {
    event.notification.close(); // Close the notification

    // Handle actions or navigate to a URL
    const clickAction = event.action;
    const targetUrl = event.notification.data || '/';

    if (clickAction) {
        // Handle specific action buttons
        console.log('Notification action clicked:', clickAction);
    }

    // Navigate to the specified URL
    event.waitUntil(
        clients.matchAll({ type: 'window', includeUncontrolled: true }).then(clientList => {
            // If there's already a window open, focus it
            for (const client of clientList) {
                if (client.url === targetUrl && 'focus' in client) {
                    return client.focus();
                }
            }
            // Otherwise, open a new tab
            if (clients.openWindow) {
                return clients.openWindow(targetUrl);
            }
        })
    );
});

// Handle notification close event
self.addEventListener('notificationclose', event => {
    console.log('Notification was closed:', event.notification);
});
