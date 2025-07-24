<template>
  <div class="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black text-gray-100">
    <div class="container mx-auto px-6 py-12 max-w-5xl">
      <h1 class="text-4xl font-bold mb-10 text-white">🛒 Mon panier</h1>

      <!-- Si non connecté -->
      <div v-if="!user" class="text-center text-red-400">
        <p>⚠️ Vous devez être connecté pour accéder à votre panier.</p>
      </div>

      <!-- Chargement -->
      <div v-else-if="loading" class="flex justify-center items-center h-64">
        <div class="w-16 h-16 border-4 border-gray-700 border-t-blue-500 rounded-full animate-spin"></div>
      </div>

      <!-- Panier vide -->
      <div v-else-if="cart.length === 0" class="text-center text-gray-400 mt-10">
        <p>Votre panier est vide.</p>
      </div>

      <!-- Panier rempli -->
      <div v-else class="space-y-6">
        <div
          v-for="item in cart"
          :key="item.id"
          class="flex items-center bg-gray-800 rounded-xl p-4 shadow-md hover:shadow-lg transition"
        >
          <img
            :src="item.image"
            alt="Image produit"
            class="w-24 h-24 object-cover rounded-lg mr-6"
          />
          <div class="flex-1">
            <h2 class="text-xl font-semibold text-white">{{ item.name }}</h2>
            <p class="text-blue-400 font-medium">{{ item.price }} €</p>
            <p class="text-gray-400 text-sm">Quantité : {{ item.quantity || 1 }}</p>
          </div>
          <button
            @click="removeFromCart(item.id)"
            class="text-red-400 hover:text-red-300 transition text-sm"
          >
            ✖ Supprimer
          </button>
        </div>

        <!-- Total -->
        <div class="text-right mt-8 border-t border-gray-700 pt-6">
          <p class="text-2xl font-bold text-blue-400">Total : {{ totalPrice }} €</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue';
import { useRouter } from 'vue-router';
import { db } from '../firebase';
import {
  collection,
  getDocs,
  deleteDoc,
  doc
} from 'firebase/firestore';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../firebase';

const user = ref(null);
const cart = ref([]);
const loading = ref(true);
const router = useRouter();

// Total
const totalPrice = computed(() =>
  cart.value.reduce((total, item) => total + (item.price || 0) * (item.quantity || 1), 0)
);

// Charger le panier utilisateur
async function loadCart() {
  if (!user.value) return;
  const cartRef = collection(db, 'users', user.value.uid, 'cart');
  const snapshot = await getDocs(cartRef);
  cart.value = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
}

// Supprimer du panier
async function removeFromCart(productId) {
  if (!user.value) return;
  await deleteDoc(doc(db, 'users', user.value.uid, 'cart', productId));
  cart.value = cart.value.filter((item) => item.id !== productId);
}

// Auth state
onMounted(() => {
  onAuthStateChanged(auth, async (currentUser) => {
    if (!currentUser) {
      user.value = null;
      loading.value = false;
      router.push('/login'); // Redirection login si pas connecté
    } else {
      user.value = currentUser;
      await loadCart();
      loading.value = false;
    }
  });
});
</script>

<style scoped>
/* Optionnel : animations, transitions, hover, etc. */
</style>
