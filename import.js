import { initializeApp } from 'firebase/app'
import { getFirestore, doc, setDoc } from 'firebase/firestore'
import fs from 'fs'

// 🔐 Remplace ceci par la config de ton projet Firebase (trouvable dans settings > config)
const firebaseConfig = {
  apiKey: "AIzaSyC3Tz1UYq--bkDpijqk1RS8jg_JJZFcRg0",
  authDomain: "liquid-flow-pc.firebaseapp.com",
  projectId: "liquid-flow-pc",
  storageBucket: "liquid-flow-pc.firebasestorage.app",
  messagingSenderId: "374920363726",
  appId: "1:374920363726:web:433e756e823e1ad481da9f",
  measurementId: "G-YT9XRLG9RB"
};


const app = initializeApp(firebaseConfig)
const db = getFirestore(app)

const data = JSON.parse(fs.readFileSync('./components-image.json', 'utf-8'))

async function importData() {
  for (const [id, component] of Object.entries(data)) {
    await setDoc(doc(db, 'components-image', id), component)
    console.log(`✅ Importé : ${id}`)
  }
  console.log('🎉 Import terminé.')
}

importData().catch(console.error)
