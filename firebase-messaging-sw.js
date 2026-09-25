importScripts('https://www.gstatic.com/firebasejs/10.8.0/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/10.8.0/firebase-messaging-compat.js');

firebase.initializeApp({
  apiKey: "AIzaSyCmbImmOuNb4k0iuVSkFeWiZ-8je8zbxmA",
  authDomain: "forum-discussion-f47cc.firebaseapp.com",
  databaseURL: "https://forum-discussion-f47cc-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "forum-discussion-f47cc",
  storageBucket: "forum-discussion-f47cc.firebasestorage.app",
  messagingSenderId: "479671843496",
  appId: "1:479671843496:web:0b338af1d5cced5f9ce09d"
});

const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
    icon: payload.notification.icon || '/icon.png'
  };
  self.registration.showNotification(notificationTitle, notificationOptions);
});
