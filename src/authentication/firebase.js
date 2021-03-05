import firebase from "firebase/app"
import "firebase/auth"
import "firebase/firestore"
import "firebase/storage"

const app=firebase.initializeApp({
    apiKey: process.env.REACT_APP_FB_API_KEY,
    authDomain: process.env.REACT_APP_FB_AUTH_DOMAIN,
    projectId: process.env.REACT_APP_FB_PROJECT_ID,
    storageBucket: process.env.REACT_APP_FB_STORAGE_BUCKET,
    messagingSenderId: process.env.REACT_APP_FB_MSG_SENDER_ID,
    appId: process.env.REACT_APP_FB_API_ID
})

const firestore=app.firestore()

export const database={
    folders: firestore.collection("folders"),
    files: firestore.collection("files"),
    formatDoc: (doc)=>({id: doc.id, ...doc.data()})
}
export const auth=app.auth()
export const storage=app.storage()
export default app