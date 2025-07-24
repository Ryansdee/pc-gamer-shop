<template>
  <div class="min-h-screen bg-gradient-to-r from-blue-900 via-purple-900 to-indigo-900 flex flex-col items-center justify-center px-4 py-12 text-white">
    <div class="bg-gray-800 bg-opacity-90 rounded-xl shadow-xl max-w-lg w-full p-8">
      <h2 class="text-4xl font-extrabold mb-6 text-center bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-blue-400">
        Mon Profil
      </h2>

      <div class="space-y-6">
        <div class="flex items-center space-x-4">
          <img
            v-if="imageUrl"
            :src="imageUrl"
            alt="Test Image"
            class="w-32 h-32 rounded-full border-4 border-blue-500"
          />
          <div v-else class="w-20 h-20 rounded-full bg-blue-600 flex items-center justify-center text-3xl font-bold uppercase shadow-md border-4 border-blue-500">
            {{ userInitials }}
          </div>

          <div>
            <h3 class="text-xl font-semibold">{{ user?.displayName || 'Utilisateur' }}</h3>
            <p class="text-blue-300 italic text-sm">Membre depuis : {{ formattedCreationDate }}</p>
          </div>
        </div>

        <div class="bg-gray-700 rounded-lg p-4">
          <h4 class="text-lg font-semibold mb-2">Informations personnelles</h4>
          <ul class="space-y-2 text-gray-300">
            <li>
              <strong>Email :</strong> {{ user?.email }}
            </li>
            <li v-if="firestoreUser?.phoneNumber">
                <strong>Téléphone :</strong> {{ firestoreUser.phoneNumber }}
            </li>
            <li v-else>
                <strong>Téléphone :</strong> Non renseigné
            </li>
          </ul>
        </div>

        <button
          @click="logout"
          class="w-full py-3 rounded-lg bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 font-bold transition-transform active:scale-95 shadow-lg"
        >
          Déconnexion
        </button>
        <div class="flex space-x-4 mt-6">
  <router-link
    to="/profile/settings"
    class="flex-1 text-center py-3 rounded-lg bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 font-semibold transition-transform active:scale-95 shadow-md"
  >
    Paramètres
  </router-link>

  <router-link
    to="/profile/orders"
    class="flex-1 text-center py-3 rounded-lg bg-gradient-to-r from-green-600 to-teal-600 hover:from-green-700 hover:to-teal-700 font-semibold transition-transform active:scale-95 shadow-md"
  >
    Commandes
  </router-link>
</div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { auth } from '../firebase'
import { onAuthStateChanged, signOut } from 'firebase/auth'
import { useRouter } from 'vue-router'

// Import Firestore
import { getFirestore, doc, getDoc } from 'firebase/firestore'

const user = ref(null)
const firestoreUser = ref(null)  // données Firestore (phoneNumber etc)

const router = useRouter()
const db = getFirestore()

onMounted(() => {
  onAuthStateChanged(auth, async (u) => {
    if (u) {
      user.value = u
      // Récupérer les données Firestore pour compléter user
      const userDocRef = doc(db, 'users', u.uid)
      const userSnap = await getDoc(userDocRef)
      if (userSnap.exists()) {
        firestoreUser.value = userSnap.data()
      } else {
        firestoreUser.value = {}
      }
    } else {
      router.push('/login')
    }
  })
})

// Initiales à afficher si pas de photo
const userInitials = computed(() => {
  if (!user.value?.displayName) return 'U'
  return user.value.displayName
    .split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase()
})

// Date de création formatée
const formattedCreationDate = computed(() => {
  if (!user.value?.metadata?.creationTime) return 'Inconnue'
  return new Date(user.value.metadata.creationTime).toLocaleDateString(undefined, {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
})

const logout = async () => {
  await signOut(auth)
  router.push('/')
}
</script>

