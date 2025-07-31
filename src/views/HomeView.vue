<template>
  <div class="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-100">
    <div class="container mx-auto px-6 py-8">
      
      <!-- ==============================================
           SECTION: FILTRES ET RECHERCHE
           ============================================== -->
      <div class="bg-white/80 backdrop-blur-sm rounded-xl border border-blue-200 shadow-lg p-6 mb-8">
        
        <!-- Barre principale avec contrôles -->
        <div class="flex flex-col lg:flex-row gap-6 items-center">
          
          <!-- Barre de recherche -->
          <div class="flex-1 relative">
            <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <svg class="h-5 w-5 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" 
                      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
              </svg>
            </div>
            <input
              v-model="searchQuery"
              type="text"
              placeholder="Rechercher un PC..."
              class="w-full pl-10 pr-4 py-3 bg-blue-50 border border-blue-300 rounded-lg 
                     text-gray-900 placeholder-blue-400 focus:ring-2 focus:ring-blue-500 
                     focus:border-blue-500 transition-all duration-300"
            />
          </div>

          <!-- Filtre de prix -->
          <div class="flex items-center space-x-4">
            <label class="text-gray-700 font-medium whitespace-nowrap">
              Budget max:
            </label>
            <select 
              v-model="maxPrice" 
              class="px-4 py-3 bg-blue-50 border border-blue-300 rounded-lg text-gray-900 
                     focus:ring-2 focus:ring-blue-500 focus:border-blue-500 
                     transition-all duration-300"
            >
              <option value="">Tous</option>
              <option value="1000">- 1000€</option>
              <option value="1500">- 1500€</option>
              <option value="2000">- 2000€</option>
              <option value="3000">- 3000€</option>
            </select>
          </div>

          <!-- Options de tri -->
          <div class="flex items-center space-x-4">
            <label class="text-gray-700 font-medium whitespace-nowrap">
              Trier par:
            </label>
            <select 
              v-model="sortBy" 
              class="px-4 py-3 bg-blue-50 border border-blue-300 rounded-lg text-gray-900 
                     focus:ring-2 focus:ring-blue-500 focus:border-blue-500 
                     transition-all duration-300"
            >
              <option value="name">Nom</option>
              <option value="price">Prix croissant</option>
              <option value="price-desc">Prix décroissant</option>
              <option value="performance">Performance</option>
            </select>
          </div>

          <!-- Basculer vue grille/liste -->
          <div class="flex bg-blue-50 rounded-lg border border-blue-300 overflow-hidden">
            <button
              @click="viewMode = 'grid'"
              :class="viewMode === 'grid' ? 'bg-blue-600 text-white' : 'text-blue-600 hover:text-blue-800 hover:bg-blue-100'"
              class="px-4 py-3 transition-colors duration-200"
              title="Vue en grille"
            >
              <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path d="M5 3a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2V5a2 2 0 00-2-2H5zM5 11a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2v-2a2 2 0 00-2-2H5zM11 5a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V5zM11 13a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"/>
              </svg>
            </button>
            <button
              @click="viewMode = 'list'"
              :class="viewMode === 'list' ? 'bg-blue-600 text-white' : 'text-blue-600 hover:text-blue-800 hover:bg-blue-100'"
              class="px-4 py-3 transition-colors duration-200"
              title="Vue en liste"
            >
              <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" 
                      d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" 
                      clip-rule="evenodd"/>
              </svg>
            </button>
          </div>
        </div>

        <!-- Filtres actifs -->
        <div v-if="activeFiltersCount > 0" 
             class="flex flex-wrap gap-2 mt-4 pt-4 border-t border-blue-200">
          <span class="text-sm text-gray-600">Filtres actifs:</span>
          
          <!-- Badge filtre de recherche -->
          <button 
            v-if="searchQuery"
            @click="searchQuery = ''"
            class="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium 
                   bg-blue-100 text-blue-700 border border-blue-300 
                   hover:bg-blue-200 transition-colors duration-200"
          >
            Recherche: "{{ searchQuery }}"
            <svg class="ml-1 w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
              <path fill-rule="evenodd" 
                    d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" 
                    clip-rule="evenodd"/>
            </svg>
          </button>
          
          <!-- Badge filtre de prix -->
          <button 
            v-if="maxPrice"
            @click="maxPrice = ''"
            class="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium 
                   bg-green-100 text-green-700 border border-green-300 
                   hover:bg-green-200 transition-colors duration-200"
          >
            Max: {{ maxPrice }}€
            <svg class="ml-1 w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
              <path fill-rule="evenodd" 
                    d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" 
                    clip-rule="evenodd"/>
            </svg>
          </button>
          
          <!-- Bouton effacer tout -->
          <button 
            @click="clearAllFilters"
            class="text-xs text-gray-600 hover:text-red-600 underline 
                   transition-colors duration-200"
          >
            Effacer tout
          </button>
        </div>
      </div>

      <!-- ==============================================
           SECTION: ÉTATS DE CHARGEMENT ET RÉSULTATS
           ============================================== -->
      
      <!-- État de chargement -->
      <div v-if="loading" class="flex justify-center items-center py-20">
        <div class="relative">
          <div class="w-16 h-16 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin"></div>
          <div class="absolute inset-0 flex items-center justify-center">
            <svg class="w-6 h-6 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
              <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3z"/>
            </svg>
          </div>
        </div>
      </div>

      <!-- Aucun résultat -->
      <div v-else-if="filteredPcs.length === 0 && !loading" 
           class="text-center py-20">
        <div class="w-24 h-24 mx-auto mb-6 bg-blue-100 rounded-full flex items-center justify-center">
          <svg class="w-12 h-12 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" 
                  d="M9.172 16.172a4 4 0 015.656 0M9 12h6m-6-4h6m2 5.291A7.962 7.962 0 0112 15c-2.34 0-4.467.881-6.127 2.325C4.398 18.247 3 19.879 3 21.75V22a1 1 0 001 1h16a1 1 0 001-1v-.25c0-1.871-1.398-3.503-2.873-4.425zM15 11a3 3 0 11-6 0 3 3 0 016 0z"/>
          </svg>
        </div>
        <h3 class="text-xl font-semibold text-gray-700 mb-2">
          Aucun PC trouvé
        </h3>
        <p class="text-gray-500 mb-6">
          Essayez de modifier vos critères de recherche
        </p>
        <button 
          @click="clearAllFilters"
          class="bg-gradient-to-r from-blue-600 to-blue-700 text-white px-6 py-3 
                 rounded-lg font-medium hover:from-blue-700 hover:to-blue-800 
                 transition-all duration-300 transform hover:scale-105 shadow-lg"
        >
          Voir tous les PC
        </button>
      </div>

      <!-- ==============================================
           SECTION: AFFICHAGE DES RÉSULTATS
           ============================================== -->
      <template v-else>
        
        <!-- Compteur de résultats -->
        <div class="flex justify-between items-center mb-6">
          <p class="text-gray-700">
            <span class="font-semibold text-gray-900">{{ filteredPcs.length }}</span> 
            configuration{{ filteredPcs.length > 1 ? 's' : '' }} 
            trouvée{{ filteredPcs.length > 1 ? 's' : '' }}
          </p>
          <div class="text-sm text-gray-500">
            Trié par {{ sortLabels[sortBy] }}
          </div>
        </div>

        <!-- Grille/Liste des produits -->
        <transition-group 
          name="fade-slide" 
          tag="div" 
          :class="viewMode === 'grid' 
            ? 'grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-6' 
            : 'space-y-4'"
        >
          <PcCard 
            v-for="pc in paginatedPcs" 
            :key="pc.id" 
            :pc="pc" 
            :view-mode="viewMode"
            @add-to-cart="handleAddToCart"
            class="fade-slide-item"
          />
        </transition-group>

        <!-- ==============================================
             SECTION: PAGINATION
             ============================================== -->
        <div v-if="totalPages > 1" 
             class="flex justify-center items-center space-x-4 mt-12">
          
          <!-- Bouton précédent -->
          <button
            @click="currentPage--"
            :disabled="currentPage === 1"
            class="px-4 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-600 
                   disabled:opacity-50 disabled:cursor-not-allowed 
                   transition-all duration-200"
          >
            Précédent
          </button>
          
          <!-- Numéros de pages -->
          <div class="flex space-x-2">
            <button
              v-for="page in visiblePages"
              :key="page"
              @click="currentPage = page"
              :class="page === currentPage 
                ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white' 
                : 'bg-gray-700 text-gray-300 hover:bg-gray-600'"
              class="px-4 py-2 rounded-lg transition-all duration-200 font-medium"
            >
              {{ page }}
            </button>
          </div>
          
          <!-- Bouton suivant -->
          <button
            @click="currentPage++"
            :disabled="currentPage === totalPages"
            class="px-4 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-600 
                   disabled:opacity-50 disabled:cursor-not-allowed 
                   transition-all duration-200"
          >
            Suivant
          </button>
        </div>
        
      </template>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, watch } from "vue";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase";
import PcCard from "../components/PcCard.vue";

// States
const pcs = ref([]);
const loading = ref(true);
const searchQuery = ref('');
const maxPrice = ref('');
const sortBy = ref('price');
const viewMode = ref('grid');
const currentPage = ref(1);
const itemsPerPage = 12;

// Labels pour l'affichage
const sortLabels = {
  price: 'Prix croissant',
  'price-desc': 'Prix décroissant',
  name: 'Nom',
  performance: 'Performance'
};

// Computed properties
const availableCount = computed(() => 
  pcs.value.filter(pc => pc.inStock).length
);

const averagePrice = computed(() => {
  if (pcs.value.length === 0) return 0;
  const total = pcs.value.reduce((sum, pc) => sum + pc.price, 0);
  return total / pcs.value.length;
});

const activeFiltersCount = computed(() => {
  let count = 0;
  if (searchQuery.value) count++;
  if (maxPrice.value) count++;
  return count;
});

const filteredPcs = computed(() => {
  let filtered = [...pcs.value];

  // Recherche textuelle
  if (searchQuery.value) {
    const query = searchQuery.value.toLowerCase();
    filtered = filtered.filter(pc => 
      pc.name.toLowerCase().includes(query) ||
      pc.cpu.toLowerCase().includes(query) ||
      pc.gpu.toLowerCase().includes(query) ||
      pc.ram.toLowerCase().includes(query)
    );
  }

  // Filtre par prix
  if (maxPrice.value) {
    filtered = filtered.filter(pc => pc.price <= parseInt(maxPrice.value));
  }

  // Tri
  filtered.sort((a, b) => {
    switch (sortBy.value) {
      case 'price':
        return a.price - b.price;
      case 'price-desc':
        return b.price - a.price;
      case 'performance':
        return (b.performanceScore || 0) - (a.performanceScore || 0);
      case 'name':
      default:
        return a.name.localeCompare(b.name);
    }
  });

  return filtered;
});

const totalPages = computed(() => 
  Math.ceil(filteredPcs.value.length / itemsPerPage)
);

const paginatedPcs = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage;
  const end = start + itemsPerPage;
  return filteredPcs.value.slice(start, end);
});

const visiblePages = computed(() => {
  const pages = [];
  const total = totalPages.value;
  const current = currentPage.value;
  
  if (total <= 7) {
    for (let i = 1; i <= total; i++) {
      pages.push(i);
    }
  } else {
    pages.push(1);
    if (current > 4) pages.push('...');
    
    const start = Math.max(2, current - 1);
    const end = Math.min(total - 1, current + 1);
    
    for (let i = start; i <= end; i++) {
      pages.push(i);
    }
    
    if (current < total - 3) pages.push('...');
    pages.push(total);
  }
  
  return pages;
});

// Methods
async function fetchPCs() {
  try {
    loading.value = true;
    const querySnapshot = await getDocs(collection(db, "pc"));
    pcs.value = querySnapshot.docs
      .map(doc => ({
        id: doc.id,
        ...doc.data(),
        inStock: doc.data().inStock ?? true,
        performanceScore: doc.data().performanceScore ?? Math.floor(Math.random() * 5) + 1
      }))
      .sort((a, b) => a.price - b.price); // Tri par prix croissant
    console.log("PCs récupérés :", pcs.value);
  } catch (error) {
    console.error("Erreur lors du chargement des PC:", error);
  } finally {
    loading.value = false;
  }
}


const clearAllFilters = () => {
  searchQuery.value = '';
  maxPrice.value = '';
  sortBy.value = 'name';
  currentPage.value = 1;
};

const handleAddToCart = (pc) => {
  console.log(`${pc.name} ajouté au panier`);
  // Logique d'ajout au panier
};

// Watchers
watch([searchQuery, maxPrice, sortBy], () => {
  currentPage.value = 1;
});

// Lifecycle
onMounted(() => {
  fetchPCs();
});
</script>

<style scoped>
/* Animations pour les transitions */
.fade-slide-enter-active,
.fade-slide-leave-active {
  transition: all 0.5s ease;
}

.fade-slide-enter-from {
  opacity: 0;
  transform: translateY(30px);
}

.fade-slide-leave-to {
  opacity: 0;
  transform: translateY(-30px);
}

.fade-slide-move {
  transition: transform 0.5s ease;
}

/* Animation pour les éléments de grille */
.fade-slide-item {
  transition: all 0.3s ease;
}

/* Responsive breakpoints personnalisés */
@media (min-width: 1536px) {
  .container {
    max-width: 1400px;
  }
}
</style>