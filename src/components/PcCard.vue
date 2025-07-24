<template>
  <div class="group relative bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 border border-gray-700 rounded-xl shadow-2xl p-6 max-w-sm hover:shadow-blue-500/20 transition-all duration-500 hover:scale-105 hover:border-blue-500/50 overflow-hidden">
    <!-- Effet de brillance animé -->
    <div class="absolute inset-0 bg-gradient-to-r from-transparent via-blue-500/10 to-transparent -skew-x-12 translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-1000 ease-out"></div>
    
    <!-- Badge de disponibilité -->
    <div class="absolute top-4 right-4 z-10">
      <span 
        class="px-2 py-1 text-xs font-semibold rounded-full backdrop-blur-sm"
        :class="pc.inStock ? 'bg-green-500 text-white border border-green-500/30' : 'bg-red-500/20 text-red-400 border border-red-500/30'"
      >
        {{ pc.inStock ? 'En stock' : 'Rupture' }}
      </span>
    </div>

    <!-- Badge promotion si applicable -->
    <div v-if="pc.discount" class="absolute top-4 left-4 z-10">
      <span class="px-2 py-1 text-xs font-bold rounded-full bg-gradient-to-r from-red-500 to-pink-500 text-white animate-pulse">
        -{{ pc.discount }}%
      </span>
    </div>

    <!-- Image du produit -->
    <div class="relative mb-6 overflow-hidden rounded-lg">
      <img 
        :src="pc.image" 
        :alt="`PC Gaming ${pc.name}`" 
        class="w-full h-48 object-cover transition-transform duration-700 group-hover:scale-110"
        loading="lazy"
      />
      <!-- Overlay gradient sur hover -->
      <div class="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
      
      <!-- Bouton favoris -->
      <button 
        @click.stop="toggleFavorite"
        class="absolute top-3 right-3 p-2 rounded-full bg-black/20 backdrop-blur-sm hover:bg-red-500/80 transition-all duration-300 transform hover:scale-110"
        :class="{ 'text-red-500': isFavorite, 'text-white/70': !isFavorite }"
      >
        <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
          <path fill-rule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clip-rule="evenodd"/>
        </svg>
      </button>
    </div>

    <!-- Informations du produit -->
    <div class="space-y-4">
      <!-- Nom du produit -->
      <h3 class="text-xl font-bold text-white group-hover:text-blue-400 transition-colors duration-300 line-clamp-2">
        {{ pc.name }}
      </h3>

      <!-- Spécifications techniques -->
      <div class="space-y-2 text-sm">
        <div class="flex items-center space-x-2 text-gray-300">
          <svg class="w-4 h-4 text-blue-400 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
            <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3z"/>
          </svg>
          <span class="font-medium text-blue-400">CPU:</span>
          <span class="truncate">{{ pc.cpu }}</span>
        </div>
        
        <div class="flex items-center space-x-2 text-gray-300">
          <svg class="w-4 h-4 text-purple-400 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
            <path fill-rule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clip-rule="evenodd"/>
          </svg>
          <span class="font-medium text-purple-400">GPU:</span>
          <span class="truncate">{{ pc.gpu }}</span>
        </div>
        
        <div class="flex items-center space-x-2 text-gray-300">
          <svg class="w-4 h-4 text-green-400 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
            <path d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zM3 10a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1v-6zM14 9a1 1 0 00-1 1v6a1 1 0 001 1h2a1 1 0 001-1v-6a1 1 0 00-1-1h-2z"/>
          </svg>
          <span class="font-medium text-green-400">RAM:</span>
          <span>{{ pc.ram }}</span>
        </div>
        <div class="flex items-center space-x-2 text-gray-300">
          <svg class="w-4 h-4 text-red-400 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
            <path d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zM3 10a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1v-6zM14 9a1 1 0 00-1 1v6a1 1 0 001 1h2a1 1 0 001-1v-6a1 1 0 00-1-1h-2z"/>
          </svg>
          <span class="font-medium text-red-400">Storage:</span>
          <span>{{ pc.storage }}</span>
        </div>
      </div>

      <!-- Prix -->
      <div class="flex items-center justify-between pt-2 border-t border-gray-700">
        <div class="flex flex-col">
          <div v-if="pc.discount" class="flex items-center space-x-2">
            <span class="text-sm text-gray-400 line-through">{{ pc.originalPrice }} €</span>
            <span class="text-xs bg-red-500 text-white px-1 rounded">-{{ pc.discount }}%</span>
          </div>
        </div>
        
        <!-- Indicateur de prix -->
        <div class="flex flex-col items-end">
          <span class="text-xs text-gray-400">à partir de</span>
          <span class="text-xs text-blue-400 font-medium">{{ pc.price }}€ ou {{ Math.round(pc.price/12) }}€/mois</span>
        </div>
      </div>

      <!-- Boutons d'action -->
      <div class="flex space-x-2 pt-4">
        <router-link 
          :to="{ name: 'ProductDetail', params: { id: pc.id }}" 
          class="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4 py-3 rounded-lg font-medium text-center hover:from-blue-700 hover:to-purple-700 transition-all duration-300 transform hover:scale-105 active:scale-95 hover:shadow-lg hover:shadow-blue-500/25"
        >
          <span class="flex items-center justify-center space-x-2">
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/>
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"/>
            </svg>
            <span>Voir détails</span>
          </span>
        </router-link>
        
        <button 
          @click="addToCart"
          :disabled="!pc.inStock"
          class="px-4 py-3 rounded-lg font-medium transition-all duration-300 transform hover:scale-105 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
          :class="pc.inStock 
            ? 'bg-gray-700 text-white hover:bg-gray-600 border border-gray-600 hover:border-blue-500 hover:shadow-lg' 
            : 'bg-gray-800 text-gray-500 border border-gray-700'"
        >
          <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
            <path d="M3 1a1 1 0 000 2h1.22l.305 1.222a.997.997 0 00.01.042l1.358 5.43-.893.892C3.74 11.846 4.632 14 6.414 14H15a1 1 0 000-2H6.414l1-1H14a1 1 0 00.894-.553l3-6A1 1 0 0017 3H6.28l-.31-1.243A1 1 0 005 1H3zM16 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM6.5 18a1.5 1.5 0 100-3 1.5 1.5 0 000 3z"/>
          </svg>
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const props = defineProps({
  pc: {
    type: Object,
    required: true
  }
})

const isFavorite = ref(false)

// Fonctions utilitaires
const formatPrice = (price) => {
  return new Intl.NumberFormat('fr-FR', {
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }).format(price)
}

const toggleFavorite = () => {
  isFavorite.value = !isFavorite.value
  // Ici vous pouvez ajouter la logique pour sauvegarder en favoris
  console.log(`${props.pc.name} ${isFavorite.value ? 'ajouté aux' : 'retiré des'} favoris`)
}

const addToCart = () => {
  if (props.pc.inStock) {
    // Logique d'ajout au panier
    console.log(`${props.pc.name} ajouté au panier`)
    // Émission d'un événement pour le parent
    // emit('add-to-cart', props.pc)
  }
}
</script>

<style scoped>
/* Utilitaire pour limiter le texte sur plusieurs lignes */
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

/* Animation personnalisée pour l'effet de brillance */
@keyframes shimmer {
  0% { transform: translateX(-200%) skew(-12deg); }
  100% { transform: translateX(200%) skew(-12deg); }
}

/* Responsive design pour très petits écrans */
@media (max-width: 320px) {
  .max-w-sm {
    max-width: 100%;
  }
}
</style>