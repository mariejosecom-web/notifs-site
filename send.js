const admin = require('firebase-admin');

const serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT);

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const db = admin.firestore();
const messaging = admin.messaging();

async function run() {
  const title = process.env.NOTIF_TITLE || "Nouveau message !";
  const body = process.env.NOTIF_BODY || "Venez découvrir les nouveautés sur le site.";
  const url = process.env.NOTIF_URL || "https://chefjako.fr";

  console.log(`Préparation de l'envoi : "${title}" - "${body}"`);

  const snapshot = await db.collection('abonnements_fcm').get();
  if (snapshot.empty) {
    console.log("Aucun abonné trouvé dans Firestore.");
    return;
  }

  const tokens = [];
  snapshot.forEach(doc => {
    const data = doc.data();
    if (data.token) tokens.push(data.token);
  });

  console.log(`${tokens.length} abonné(s) trouvé(s).`);

  const response = await messaging.sendEachForMulticast({
    tokens: tokens,
    notification: {
      title: title,
      body: body
    },
    webpush: {
      fcmOptions: {
        link: url
      }
    }
  });

  console.log(`Envoi terminé : ${response.successCount} succès, ${response.failureCount} échecs.`);
}

run().catch(err => {
  console.error("Erreur d'envoi :", err);
  process.exit(1);
});
