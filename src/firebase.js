import admin from "firebase-admin";
import fs from "fs";

const serviceAccount = JSON.parse(
  fs.readFileSync("./service-account.json", "utf8")
);

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

export const db = admin.firestore();

if (process.env.NODE_ENV === "development") {
  console.log("[DEV] Connect to FireStore Emulator");
  db.settings({
    host: "localhost:8080",
    ssl: false,
  });
}
