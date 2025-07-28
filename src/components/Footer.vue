<template>
  <footer class="bg-gradient-to-br from-gray-900 via-gray-800 to-black border-t border-gray-700">
    <!-- Main Footer Content -->
    <div class="container mx-auto px-6 py-12">
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        
        <!-- Brand Section -->
        <div class="space-y-6">
          <div class="flex items-center space-x-3">
          <div class="w-20 bg-transparent from-blue-400 to-purple-600 rounded-lg flex items-center justify-center">
            <img src="../../LIQUIDFLOW.png" alt="">
          </div>
            <div>
              <h3 class="text-xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                Liquid Flow
              </h3>
              <span class="text-xs text-gray-400">PC Gaming Excellence</span>
            </div>
          </div>
          
          <p class="text-gray-300 text-sm leading-relaxed">
            Votre partenaire de confiance pour les PC gaming haute performance. 
            Configurations sur-mesure, composants premium et service client expert.
          </p>
          
          <!-- Social Media -->
          <div class="flex space-x-4">
            <a 
            href="https://www.twitch.tv/ryansdee" 
            class="w-10 h-10 bg-gray-700 hover:bg-purple-600 rounded-lg flex items-center justify-center transition-all duration-300 hover:scale-110 hover:shadow-lg hover:shadow-purple-500/25"
            aria-label="twitch"
            target="_blank" rel="noopener noreferrer"
            >
            <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path d="M4.201 2L2 6.235v14.353h6.353V22l3.523-3.523h4.352L22 8.941V2H4.201zm15.06 6.883l-3.883 3.882h-4.71l-2.824 2.825v-2.825H3.529V3.412h15.732v5.47z"/>
                <path d="M15.529 7.588h-1.176v4.706h1.176v-4.706zm-4.71 0h-1.176v4.706h1.176v-4.706z"/>
            </svg>
            </a>

            <a 
              href="https://www.youtube.com/@ryansdee" 
              class="w-10 h-10 bg-gray-700 hover:bg-red-600 rounded-lg flex items-center justify-center transition-all duration-300 hover:scale-110 hover:shadow-lg hover:shadow-red-500/25"
              aria-label="YouTube"
              target="_blank" rel="noopener noreferrer"
            >
              <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
              </svg>
            </a>
          </div>
        </div>

        <!-- Quick Links -->
        <div class="space-y-6">
          <h4 class="text-lg font-semibold text-white">Navigation</h4>
          <ul class="space-y-3">
            <li>
              <router-link 
                to="/" 
                class="text-gray-300 hover:text-blue-400 transition-colors duration-200 flex items-center space-x-2 group"
              >
                <svg class="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity duration-200" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clip-rule="evenodd"/>
                </svg>
                <span>Accueil</span>
              </router-link>
            </li>
            <li>
              <router-link 
                to="/cart" 
                class="text-gray-300 hover:text-blue-400 transition-colors duration-200 flex items-center space-x-2 group"
              >
                <svg class="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity duration-200" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clip-rule="evenodd"/>
                </svg>
                <span>Panier</span>
              </router-link>
            </li>
            <li>
              <router-link 
                to="/about" 
                class="text-gray-300 hover:text-blue-400 transition-colors duration-200 flex items-center space-x-2 group"
              >
                <svg class="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity duration-200" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clip-rule="evenodd"/>
                </svg>
                <span>À propos</span>
              </router-link>
            </li>
          </ul>
        </div>

        <!-- Support -->
        <div class="space-y-6">
          <h4 class="text-lg font-semibold text-white">Support</h4>
          <ul class="space-y-3">
            <li>
              <a 
                href="mailto:ryan.deschuyteneer@gmail.com" 
                class="text-gray-300 hover:text-blue-400 transition-colors duration-200 flex items-center space-x-2 group"
              >
                <svg class="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity duration-200" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clip-rule="evenodd"/>
                </svg>
                <span>Nous contacter</span>
              </a>
            </li>
          </ul>
        </div>

        <!-- Contact Info -->
        <div class="space-y-6">
          <h4 class="text-lg font-semibold text-white">Contact</h4>
          <div class="space-y-4">
            <div class="flex items-start space-x-3">
              <div class="w-8 h-8 bg-blue-600/20 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5">
                <svg class="w-4 h-4 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/>
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/>
                </svg>
              </div>
              <div>
                <p class="text-gray-300 text-sm">Bruxelles</p>
                <p class="text-gray-300 text-sm">Belgique</p>
              </div>
            </div>
            
            <div class="flex items-center space-x-3">
              <div class="w-8 h-8 bg-green-600/20 rounded-lg flex items-center justify-center flex-shrink-0">
                <svg class="w-4 h-4 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/>
                </svg>
              </div>
              <div>
                <p class="text-gray-300 text-sm"><a href="tel:+32498196523">0498.19.65.23</a></p>
                <p class="text-xs text-gray-400">Lun-Ven: 9h-18h</p>
              </div>
            </div>
            
            <div class="flex items-center space-x-3">
              <div class="w-8 h-8 bg-purple-600/20 rounded-lg flex items-center justify-center flex-shrink-0">
                <svg class="w-4 h-4 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
                </svg>
              </div>
              <div>
                <p class="text-gray-300 text-sm"><a href="mailto:ryan.deschuyteneer@gmail.com">ryan.deschuyteneer@gmail.com</a></p>
                <p class="text-xs text-gray-400">Réponse sous 24h</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Bottom Bar -->
    <div class="border-t border-gray-700 bg-gray-900/50">
      <div class="container mx-auto px-6 py-6">
        <div class="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          <!-- Copyright -->
          <div class="flex items-center space-x-4 text-sm text-gray-400">
            <p>&copy; 2025 <span class="text-blue-400 font-medium">Liquid Flow</span> — Tous droits réservés</p>
            <div class="hidden md:flex items-center space-x-1">
              <span>Conçu avec</span>
              <svg class="w-4 h-4 text-red-500 animate-pulse" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clip-rule="evenodd"/>
              </svg>
              <span>pour les gamers</span>
            </div>
          </div>

          <!-- Legal Links -->
          <div class="flex flex-wrap justify-center md:justify-end items-center space-x-6 text-sm">
            <a href="/" class="text-gray-400 hover:text-blue-400 transition-colors duration-200">
              Accueil
            </a>
            <a href="/cart" class="text-gray-400 hover:text-blue-400 transition-colors duration-200">
              Panier
            </a>
            <a href="/about" class="text-gray-400 hover:text-blue-400 transition-colors duration-200">
              A propos
            </a>
            <a href="mailto:ryan.deschuyteneer@gmail.com" class="text-gray-400 hover:text-blue-400 transition-colors duration-200">
              Contact
            </a>
          </div>
        </div>

        <!-- Trust Badges -->
        <div class="flex flex-wrap justify-center items-center space-x-6 mt-6 pt-6 border-t border-gray-700">
          <div class="flex items-center space-x-2 text-xs text-gray-400">
            <div class="w-6 h-6 bg-green-600/20 rounded-full flex items-center justify-center">
              <svg class="w-3 h-3 text-green-400" fill="currentColor" viewBox="0 0 20 20">
                <path d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"/>
              </svg>
            </div>
            <span>Paiement sécurisé</span>
          </div>
          
          <div class="flex items-center space-x-2 text-xs text-gray-400">
            <div class="w-6 h-6 bg-blue-600/20 rounded-full flex items-center justify-center">
              <svg class="w-3 h-3 text-blue-400" fill="currentColor" viewBox="0 0 20 20">
                <path d="M8 5a1 1 0 100 2h5.586l-1.293 1.293a1 1 0 001.414 1.414l3-3a1 1 0 000-1.414l-3-3a1 1 0 10-1.414 1.414L13.586 5H8zM12 15a1 1 0 100-2H6.414l1.293-1.293a1 1 0 10-1.414-1.414l-3 3a1 1 0 000 1.414l3 3a1 1 0 001.414-1.414L6.414 15H12z"/>
              </svg>
            </div>
            <span>Retour 20 jours</span>
          </div>
          
          <div class="flex items-center space-x-2 text-xs text-gray-400">
            <div class="w-6 h-6 bg-purple-600/20 rounded-full flex items-center justify-center">
              <svg class="w-3 h-3 text-purple-400" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clip-rule="evenodd"/>
              </svg>
            </div>
            <span>Garantie 1 an</span>
          </div>
          
          <div class="flex items-center space-x-2 text-xs text-gray-400">
            <div class="w-6 h-6 bg-yellow-600/20 rounded-full flex items-center justify-center">
              <svg class="w-3 h-3 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                <path d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zM3 10a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1v-6zM14 9a1 1 0 00-1 1v6a1 1 0 001 1h2a1 1 0 001-1v-6a1 1 0 00-1-1h-2z"/>
              </svg>
            </div>
            <span>Livraison garantie</span>
          </div>
        </div>
      </div>
    </div>
  </footer>
</template>

<script setup>
import { ref } from 'vue'

const email = ref('')

const subscribeNewsletter = () => {
  if (email.value && email.value.includes('@')) {
    console.log(`Inscription newsletter: ${email.value}`)
    // Logique d'inscription à la newsletter
    email.value = ''
    // Afficher un message de confirmation
  }
}
</script>

<style scoped>
/* Animation pour les liens au hover */
.group:hover .opacity-0 {
  opacity: 1;
}

/* Animation pour le cœur */
@keyframes pulse {
  0%, 100% {
    opacity: 1;
  }
  50% {
    opacity: .5;
  }
}

/* Responsive pour très petits écrans */
@media (max-width: 320px) {
  .grid-cols-1 {
    gap: 1.5rem;
  }
  
  .space-x-6 {
    flex-direction: column;
    gap: 1rem;
  }
}

/* Amélioration du focus pour l'accessibilité */
input:focus,
button:focus {
  outline: none;
  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.3);
}
</style>