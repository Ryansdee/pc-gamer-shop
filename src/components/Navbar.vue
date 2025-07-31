<template>
  <nav class="bg-white border-b border-gray-200 text-gray-800 shadow-sm sticky top-0 z-50">
    <div class="container mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex justify-between items-center h-16 lg:h-20">
        <!-- Logo -->
        <div class="flex items-center space-x-3">
          <img src="../../LIQUIDFLOW.png" alt="Liquid Flow" class="h-20" />
          <div>
            <h1 class="text-xl lg:text-2xl font-bold text-gray-900">
              Liquid Flow
            </h1>
            <p class="text-xs text-gray-500 hidden sm:block">PC Gaming Excellence</p>
          </div>
        </div>

        <!-- Desktop Navigation -->
        <ul class="hidden lg:flex items-center space-x-6 text-sm font-medium">
          <li>
            <router-link 
              to="/" 
              class="px-2 py-2 rounded-md transition hover:bg-blue-400 hover:text-white"
              active-class="text-blue-600 font-semibold"
            >
              Accueil
            </router-link>
          </li>
          <li>
            <router-link 
              to="/cart" 
              class="px-2 py-2 rounded-md transition hover:bg-blue-400 hover:text-white"
              active-class="text-blue-600 font-semibold"
            >
              Panier
            </router-link>
          </li>
        </ul>

        <!-- Actions Desktop -->
        <div class="hidden lg:flex items-center space-x-4">
          <button class="p-2 rounded-md hover:bg-gray-100 transition">
            <svg class="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" 
                d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.82 4.82a1 1 0 01-1.42 1.42l-4.82-4.82A6 6 0 012 8z" />
            </svg>
          </button>

          <template v-if="user">
            <router-link
              to="/profile"
              class="px-4 py-2 rounded-md bg-blue-600 text-white text-sm hover:bg-blue-700 transition"
            >
              Profil
            </router-link>
            <button
              @click="logout"
              class="px-4 py-2 rounded-md bg-red-500 text-white text-sm hover:bg-red-600 transition"
            >
              Déconnexion
            </button>
          </template>

          <template v-else>
            <router-link
              to="/login"
              class="px-4 py-2 rounded-md bg-blue-600 text-white text-sm hover:bg-blue-700 transition"
            >
              Connexion
            </router-link>
          </template>
        </div>

        <!-- Mobile Controls -->
        <div class="lg:hidden flex items-center gap-2">
          <router-link to="/cart" class="p-2 rounded-md hover:bg-gray-100 transition">
            <svg class="w-5 h-5 text-gray-700" fill="currentColor" viewBox="0 0 20 20">
              <path d="M3 1a1 1 0 000 2h1.22l.305 1.222a.997.997 0 00.01.042l1.358 5.43-.893.892C3.74 11.846 4.632 14 6.414 14H15a1 1 0 000-2H6.414l1-1H14a1 1 0 00.894-.553l3-6A1 1 0 0017 3H6.28l-.31-1.243A1 1 0 005 1H3z" />
            </svg>
          </router-link>

          <button 
            @click="toggleMobileMenu"
            class="p-2 rounded-md hover:bg-gray-100 transition"
          >
            <svg class="w-6 h-6 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                :d="isMobileMenuOpen ? 'M6 18L18 6M6 6l12 12' : 'M4 6h16M4 12h16M4 18h16'" />
            </svg>
          </button>
        </div>
      </div>

      <!-- Mobile Menu -->
      <transition name="fade">
        <div 
          v-if="isMobileMenuOpen"
          class="lg:hidden mt-2 border-t border-gray-200 pt-4 space-y-2"
        >
          <router-link 
            to="/" 
            @click="closeMobileMenu"
            class="block px-4 py-2 rounded-md hover:bg-gray-100 transition"
            active-class="text-blue-600 font-semibold"
          >
            Accueil
          </router-link>
          <router-link 
            to="/shop" 
            @click="closeMobileMenu"
            class="block px-4 py-2 rounded-md hover:bg-gray-100 transition"
            active-class="text-blue-600 font-semibold"
          >
            Boutique
          </router-link>

          <div class="pt-4 border-t border-gray-200 space-y-2">
            <template v-if="user">
              <router-link
                to="/profile"
                class="block w-full text-center bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md transition"
              >
                Mon Profil
              </router-link>
              <button
                @click="logout"
                class="block w-full text-center bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md transition"
              >
                Déconnexion
              </button>
            </template>
            <template v-else>
              <router-link
                to="/login"
                class="block w-full text-center bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md transition"
              >
                Connexion
              </router-link>
            </template>
          </div>
        </div>
      </transition>
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
