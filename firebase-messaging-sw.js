importScripts('https://www.gstatic.com/firebasejs/10.8.0/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/10.8.0/firebase-messaging-compat.js');

firebase.initializeApp({
  apiKey: "AIzaSyCmbImmOUnB4k0iuVSkFeWIz-8je8ZbxmA",
  authDomain: "forum-discussion-f47cc.firebaseapp.com",
  projectId: "forum-discussion-f47cc",
  messagingSenderId: "479671843496",
  appId: "1:479671843496:web:0b338af1d5cced5f9ce09d"
});

const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
  const notificationTitle = payload.notification.title || "Nouveau message";
  const notificationOptions = {
    body: payload.notification.body,
    icon: '/notifs-site/icon.png'
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});
