<template>
  <div class="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black text-gray-100">
    <div class="container mx-auto px-6 py-12 max-w-6xl">
      <!-- Bouton retour -->
      <button
        @click="$router.back()"
        class="mb-10 flex items-center text-blue-400 hover:text-blue-300 transition duration-200"
        aria-label="Retour"
      >
        <svg
          class="w-5 h-5 mr-2"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
          viewBox="0 0 24 24"
        >
          <path d="M15 18l-6-6 6-6" />
        </svg>
        Retour
      </button>

      <!-- Loader -->
      <div v-if="loading" class="flex justify-center items-center h-64">
        <div class="w-16 h-16 border-4 border-gray-700 border-t-blue-500 rounded-full animate-spin"></div>
      </div>

      <!-- Contenu produit -->
      <div
        v-else-if="pc"
        class="grid md:grid-cols-2 gap-10 bg-gray-800/70 backdrop-blur-lg rounded-2xl p-10 shadow-2xl animate-fade-in"
      >
        <!-- Image + stock -->
        <div class="flex flex-col items-center">
          <img
            :src="pc.image"
            :alt="`Image du PC ${pc.name}`"
            class="rounded-xl w-80 h-80 object-cover shadow-lg transition-transform duration-300 hover:scale-105"
            loading="lazy"
          />
          <span
            class="mt-4 px-4 py-1 rounded-full text-sm font-medium"
            :class="{
              'bg-green-600 text-white': pc.inStock > 10,
              'bg-yellow-500 text-black': pc.inStock <= 10 && pc.inStock > 0,
              'bg-red-600 text-white': pc.inStock === 0
            }"
          >
            {{ pc.inStock > 0 ? `Encore ${pc.inStock} en stock !` : 'Rupture de stock' }}
          </span>
        </div>

        <!-- Infos -->
        <div class="flex flex-col justify-between">
          <!-- Nom + prix -->
          <div>
            <h1 class="text-4xl font-bold text-white tracking-wide mb-3">
              {{ pc.name }}
            </h1>
            <p class="text-3xl font-semibold text-blue-400 mb-4">
              {{ pc.price }} €
            </p>

            <!-- Description -->
            <div v-if="pc.description" class="mb-8">
              <h2 class="text-2xl font-semibold text-white mb-3 flex items-center gap-2">
                📝 Description
              </h2>
              <p class="text-gray-300 leading-relaxed whitespace-pre-line">
                {{ pc.description }}
              </p>
            </div>

            <!-- Composants -->
            <div class="mb-8">
              <h2 class="text-2xl font-semibold text-white mb-4 flex items-center gap-2">
                🧩 Composants
              </h2>
              <div class="space-y-5 text-base">
                <div
                  v-for="(value, key) in components"
                  :key="key"
                  class="flex items-center gap-4 hover:bg-gray-700/30 p-2 rounded-lg transition"
                >
                  <img
                    v-if="getImageFor(pc[value])"
                    :src="getImageFor(pc[value])"
                    class="w-14 h-14 object-contain bg-gray-700 rounded-lg p-2"
                    :alt="`Image de ${key}`"
                  />
                  <div>
                    <p class="text-blue-400 font-medium">{{ key }} :</p>
                    <p class="text-gray-200">{{ pc[value] }}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Bouton panier -->
          <button
            @click="addToCart"
            :disabled="pc.inStock === 0"
            class="w-full py-3 px-6 text-lg font-semibold text-white transition-all duration-300 rounded-xl shadow-lg
              bg-blue-600 hover:bg-blue-500 disabled:bg-gray-600 disabled:cursor-not-allowed"
          >
            🛒 Ajouter au panier
          </button>
        </div>
      </div>

      <!-- Aucun PC trouvé -->
      <div v-else class="text-center text-gray-400 mt-20">
        <p>Aucun PC trouvé.</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { db } from '../firebase';
import { doc, getDoc, collection, getDocs } from 'firebase/firestore';

const route = useRoute();
const pc = ref(null);
const loading = ref(true);
const componentImages = ref({});

// Map des composants
const components = {
  CPU: 'cpu',
  'Carte mère': 'mobo',
  RAM: 'ram',
  'Refroidisseur': 'cooling',
  Stockage: 'storage',
  GPU: 'gpu',
  Alimentation: 'psu',
  "Boîtier": 'case',
};

// Récupération du produit
async function fetchPC() {
  loading.value = true;
  const docRef = doc(db, 'pc', route.params.id);
  const docSnap = await getDoc(docRef);
  pc.value = docSnap.exists() ? docSnap.data() : null;
  loading.value = false;
}

// Récupération des images composants
async function fetchComponentImages() {
  const snapshot = await getDocs(collection(db, 'components-image'));
  snapshot.forEach((doc) => {
    const data = doc.data();
    if (data.name && data.imageUrl) {
      componentImages.value[data.name.toLowerCase()] = data.imageUrl;
    }
  });
}

function getImageFor(componentName) {
  if (!componentName) return '';
  return componentImages.value[componentName.toLowerCase()] || '';
}

function addToCart() {
  if (pc.value && pc.value.inStock > 0) {
    console.log('Ajouté au panier :', pc.value);
    alert(`🛒 ${pc.value.name} a été ajouté au panier !`);
  }
}

onMounted(async () => {
  await fetchComponentImages();
  await fetchPC();
});
</script>

<style scoped>
@keyframes fade-in {
  0% {
    opacity: 0;
    transform: translateY(20px);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
  }
}

.animate-fade-in {
  animation: fade-in 0.6s ease-out;
}
img {
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}
img:hover {
  transform: scale(1.03);
  box-shadow: 0 10px 25px rgba(79, 70, 229, 0.3);
}
</style>
