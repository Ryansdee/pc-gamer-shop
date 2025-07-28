<template>
  <nav class="bg-gradient-to-r from-gray-900 via-blue-900 to-gray-900 text-white shadow-lg sticky top-0 z-50 backdrop-blur-sm">
    <div class="container mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex justify-between items-center h-16 lg:h-20">
        <!-- Logo et marque -->
        <div class="flex items-center space-x-3">
          <div class="w-20 bg-transparent from-blue-400 to-purple-600 rounded-lg flex items-center justify-center">
            <img src="../../LIQUIDFLOW.png" alt="">
          </div>
          <div class="flex flex-col">
            <h1 class="text-lg lg:text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              Liquid Flow
            </h1>
            <span class="text-xs text-gray-300 hidden sm:block">PC Gaming Excellence</span>
          </div>
        </div>

        <!-- Menu desktop -->
        <ul class="hidden lg:flex items-center space-x-8 text-sm font-medium">
          <li>
            <router-link 
              to="/" 
              class="flex items-center space-x-2 px-3 py-2 rounded-lg transition-all duration-300 hover:bg-blue-600/20 hover:text-blue-400 active:scale-95"
              active-class="bg-blue-600/30 text-blue-400"
            >
              <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z"/>
              </svg>
              <span>Accueil</span>
            </router-link>
          </li>
          <li>
            <router-link 
              to="/cart" 
              class="flex items-center space-x-2 px-3 py-2 rounded-lg transition-all duration-300 hover:bg-blue-600/20 hover:text-blue-400 active:scale-95 relative"
              active-class="bg-blue-600/30 text-blue-400"
            >
              <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path d="M3 1a1 1 0 000 2h1.22l.305 1.222a.997.997 0 00.01.042l1.358 5.43-.893.892C3.74 11.846 4.632 14 6.414 14H15a1 1 0 000-2H6.414l1-1H14a1 1 0 00.894-.553l3-6A1 1 0 0017 3H6.28l-.31-1.243A1 1 0 005 1H3zM16 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM6.5 18a1.5 1.5 0 100-3 1.5 1.5 0 000 3z"/>
              </svg>
              <span>Panier</span>
            </router-link>
          </li>
        </ul>

        <!-- Boutons d'action desktop -->
        <div class="hidden lg:flex items-center space-x-4">
          <button class="p-2 hover:bg-gray-700 rounded-lg transition-colors duration-200">
            <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path fill-rule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clip-rule="evenodd"/>
            </svg>
          </button>

          <template v-if="user">
            <router-link
              to="/profile"
              class="bg-gradient-to-r from-green-600 to-teal-600 px-4 py-2 rounded-lg font-medium text-sm hover:from-green-700 hover:to-teal-700 transition-all duration-300 transform hover:scale-105 active:scale-95"
            >
              Profil
            </router-link>
            <button
              @click="logout"
              class="text-sm px-3 py-2 rounded-lg bg-red-600 hover:bg-red-700 transition"
            >
              Déconnexion
            </button>
          </template>

          <template v-else>
            <router-link
              to="/login"
              class="bg-gradient-to-r from-blue-600 to-purple-600 px-4 py-2 rounded-lg font-medium text-sm hover:from-blue-700 hover:to-purple-700 transition-all duration-300 transform hover:scale-105 active:scale-95"
            >
              Connexion
            </router-link>
          </template>
        </div>

        <!-- Menu mobile/tablette -->
        <div class="flex items-center space-x-3 lg:hidden">
          <!-- Panier mobile -->
          <router-link 
            to="/cart" 
            class="p-2 hover:bg-gray-700 rounded-lg transition-colors duration-200 relative"
          >
            <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path d="M3 1a1 1 0 000 2h1.22l.305 1.222a.997.997 0 00.01.042l1.358 5.43-.893.892C3.74 11.846 4.632 14 6.414 14H15a1 1 0 000-2H6.414l1-1H14a1 1 0 00.894-.553l3-6A1 1 0 0017 3H6.28l-.31-1.243A1 1 0 005 1H3zM16 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM6.5 18a1.5 1.5 0 100-3 1.5 1.5 0 000 3z"/>
            </svg>
          </router-link>
          
          <!-- Bouton menu hamburger -->
          <button 
            @click="toggleMobileMenu" 
            class="p-2 hover:bg-gray-700 rounded-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
            :class="{ 'bg-gray-700': isMobileMenuOpen }"
          >
            <svg 
              class="w-6 h-6 transition-transform duration-300" 
              :class="{ 'rotate-90': isMobileMenuOpen }"
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path 
                stroke-linecap="round" 
                stroke-linejoin="round" 
                stroke-width="2" 
                :d="isMobileMenuOpen ? 'M6 18L18 6M6 6l12 12' : 'M4 6h16M4 12h16M4 18h16'"
              />
            </svg>
          </button>
        </div>
      </div>

      <!-- Menu mobile déroulant -->
      <div 
        class="lg:hidden overflow-hidden transition-all duration-300 ease-in-out"
        :class="isMobileMenuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'"
      >
        <div class="py-4 border-t border-gray-700 space-y-2">
          <router-link 
            to="/" 
            @click="closeMobileMenu"
            class="flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-200 hover:bg-blue-600/20 hover:text-blue-400 active:scale-95"
            active-class="bg-blue-600/30 text-blue-400"
          >
            <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z"/>
            </svg>
            <span class="font-medium">Accueil</span>
          </router-link>
          
          <router-link 
            to="/shop" 
            @click="closeMobileMenu"
            class="flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-200 hover:bg-blue-600/20 hover:text-blue-400 active:scale-95"
            active-class="bg-blue-600/30 text-blue-400"
          >
            <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zM3 10a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1v-6zM14 9a1 1 0 00-1 1v6a1 1 0 001 1h2a1 1 0 001-1v-6a1 1 0 00-1-1h-2z"/>
            </svg>
            <span class="font-medium">Boutique</span>
          </router-link>

          <!-- Boutons d'action mobile -->
          <div class="pt-4 border-t border-gray-700 space-y-3">
            <button class="w-full flex items-center justify-center space-x-2 px-4 py-3 bg-gray-800 hover:bg-gray-700 rounded-lg transition-colors duration-200">
              <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clip-rule="evenodd"/>
              </svg>
              <span>Rechercher</span>
            </button>

            <template v-if="user">
              <router-link
                to="/profile"
                @click="closeMobileMenu"
                class="block w-full bg-green-600 hover:bg-green-700 text-white px-4 py-3 rounded-lg text-center transition"
              >
                Mon Profil
              </router-link>
              <button
                @click="logout"
                class="block w-full bg-red-600 hover:bg-red-700 px-4 py-3 rounded-lg text-center transition"
              >
                Déconnexion
              </button>
            </template>

            <template v-else>
              <router-link
                to="/login"
                @click="closeMobileMenu"
                class="block w-full bg-blue-600 hover:bg-blue-700 px-4 py-3 rounded-lg text-center transition"
              >
                Connexion
              </router-link>
            </template>
          </div>
        </div>
      </div>
    </div>
  </nav>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { auth } from '../firebase'
import { onAuthStateChanged, signOut } from 'firebase/auth'
import { useRouter } from 'vue-router'

const isMobileMenuOpen = ref(false)
const user = ref(null)
const router = useRouter()

const toggleMobileMenu = () => {
  isMobileMenuOpen.value = !isMobileMenuOpen.value
}

const closeMobileMenu = () => {
  isMobileMenuOpen.value = false
}

const logout = async () => {
  await signOut(auth)
  router.push('/')
}

const handleResize = () => {
  if (window.innerWidth >= 1024) {
    isMobileMenuOpen.value = false
  }
}

onMounted(() => {
  onAuthStateChanged(auth, (u) => {
    user.value = u
  })

  window.addEventListener('resize', handleResize)
})

onUnmounted(() => {
  window.removeEventListener('resize', handleResize)
})
</script>
