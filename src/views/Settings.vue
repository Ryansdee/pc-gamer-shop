<template>
  <div class="min-h-screen bg-gradient-to-r from-blue-900 via-purple-900 to-indigo-900 flex flex-col items-center justify-center px-4 py-12 text-white">
    <div class="bg-gray-800 bg-opacity-90 rounded-xl shadow-xl max-w-lg w-full p-8">
      <h2 class="text-4xl font-extrabold mb-6 text-center bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-blue-400">
        Paramètres du compte
      </h2>

      <form @submit.prevent="handleUpdateProfile" class="space-y-6">
        <div>
          <label for="displayName" class="block mb-1 font-semibold">Nom complet</label>
          <input
            id="displayName"
            v-model="form.displayName"
            type="text"
            placeholder="Votre nom complet"
            class="w-full rounded-md bg-gray-700 text-white px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        <div>
          <label for="email" class="block mb-1 font-semibold">Adresse email</label>
          <input
            id="email"
            v-model="form.email"
            type="email"
            placeholder="email@example.com"
            class="w-full rounded-md bg-gray-700 text-white px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        <div>
          <label for="phoneNumber" class="block mb-1 font-semibold">Numéro de téléphone</label>
          <input
            id="phoneNumber"
            v-model="form.phoneNumber"
            type="tel"
            placeholder="+33 6 12 34 56 78"
            class="w-full rounded-md bg-gray-700 text-white px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label for="password" class="block mb-1 font-semibold">Nouveau mot de passe</label>
          <input
            id="password"
            v-model="form.password"
            type="password"
            placeholder="Laissez vide pour ne pas changer"
            class="w-full rounded-md bg-gray-700 text-white px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <button
          type="submit"
          class="w-full py-3 rounded-lg bg-gradient-to-r from-green-600 to-teal-600 hover:from-green-700 hover:to-teal-700 font-bold transition-transform active:scale-95 shadow-lg"
          :disabled="loading"
        >
          {{ loading ? 'Mise à jour...' : 'Sauvegarder' }}
        </button>

        <p v-if="message" :class="messageClass" class="mt-4 text-center font-semibold">
          {{ message }}
        </p>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted } from 'vue'
import { auth } from '../firebase'
import { updateProfile as firebaseUpdateProfile, updateEmail, updatePassword, onAuthStateChanged } from 'firebase/auth'
import { useRouter } from 'vue-router'

// Import Firestore
import { getFirestore, doc, setDoc, getDoc } from 'firebase/firestore'

const router = useRouter()
const user = ref(null)
const loading = ref(false)
const message = ref('')
const messageClass = ref('text-green-400')

const form = reactive({
  displayName: '',
  email: '',
  phoneNumber: '',  // ajout du numéro
  password: ''
})

const db = getFirestore()

onMounted(async () => {
  onAuthStateChanged(auth, async (u) => {
    if (u) {
      user.value = u
      form.displayName = u.displayName || ''
      form.email = u.email || ''

      // Essayer de récupérer phoneNumber depuis Firestore
      const userDocRef = doc(db, 'users', u.uid)
      const userSnap = await getDoc(userDocRef)
      if (userSnap.exists()) {
        form.phoneNumber = userSnap.data().phoneNumber || ''
      } else {
        form.phoneNumber = ''
      }
    } else {
      router.push('/login')
    }
  })
})

const handleUpdateProfile = async () => {
  if (!user.value) return
  loading.value = true
  message.value = ''
  try {
    if (form.displayName !== user.value.displayName) {
      await firebaseUpdateProfile(user.value, { displayName: form.displayName })
    }
    if (form.email !== user.value.email) {
      await updateEmail(user.value, form.email)
    }
    if (form.password) {
      await updatePassword(user.value, form.password)
    }
    // Mettre à jour ou créer le document Firestore avec les infos utilisateur, y compris phoneNumber
    const userDocRef = doc(db, 'users', user.value.uid)
    await setDoc(
      userDocRef,
      {
        uid: user.value.uid,
        email: form.email,
        displayName: form.displayName,
        phoneNumber: form.phoneNumber
      },
      { merge: true } // merge pour ne pas écraser complètement
    )

    message.value = 'Profil mis à jour avec succès !'
    messageClass.value = 'text-green-400'
  } catch (error) {
    message.value = 'Erreur : ' + error.message
    messageClass.value = 'text-red-500'
  } finally {
    loading.value = false
  }
}
</script>
