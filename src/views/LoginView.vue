<template>
  <div class="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 to-black text-white px-6">
    <div class="bg-gray-800 p-10 rounded-2xl shadow-xl w-full max-w-md">
      <h1 class="text-3xl font-bold mb-6 text-center text-blue-400">Connexion</h1>

      <form @submit.prevent="login">
        <div class="mb-4">
          <label for="email" class="block mb-2 text-sm font-medium">Email</label>
          <input
            type="email"
            id="email"
            v-model="email"
            class="w-full px-4 py-2 rounded-lg bg-gray-700 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        <div class="mb-6">
          <label for="password" class="block mb-2 text-sm font-medium">Mot de passe</label>
          <input
            type="password"
            id="password"
            v-model="password"
            class="w-full px-4 py-2 rounded-lg bg-gray-700 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        <button
          type="submit"
          :disabled="isLoading"
          class="w-full py-3 rounded-lg bg-blue-600 hover:bg-blue-500 font-semibold text-white transition duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Se connecter
        </button>

        <div class="mt-6">
          <button
            @click="loginWithGoogle"
            :disabled="isLoading"
            class="w-full py-3 rounded-lg bg-white text-gray-800 font-semibold hover:bg-gray-100 transition duration-300 flex items-center justify-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <img
              src="https://www.svgrepo.com/show/475656/google-color.svg"
              class="w-6 h-6"
              alt="Google logo"
            />
            Se connecter avec Google
          </button>
        </div>
      </form>

      <p class="text-center text-sm text-gray-400 mt-6">
        Pas encore de compte ?
        <router-link to="/register" class="text-blue-400 hover:underline">Créer un compte</router-link>
      </p>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { signInWithEmailAndPassword, signInWithPopup } from 'firebase/auth';
import { auth, googleProvider } from '../firebase';

const email = ref('');
const password = ref('');
const isLoading = ref(false);
const router = useRouter();

const login = async () => {
  isLoading.value = true;
  try {
    await signInWithEmailAndPassword(auth, email.value, password.value);
    router.push('/');
  } catch (err) {
    alert('Erreur de connexion : ' + err.message);
  } finally {
    isLoading.value = false;
  }
};

const loginWithGoogle = async () => {
  isLoading.value = true;
  try {
    await signInWithPopup(auth, googleProvider);
    router.push('/');
  } catch (err) {
    alert('Erreur Google : ' + err.message);
  } finally {
    isLoading.value = false;
  }
};
</script>
