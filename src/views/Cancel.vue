<template>
  <div class="min-h-screen flex flex-col justify-center items-center bg-red-900 text-white p-6">
    <h1 class="text-5xl font-bold mb-6">Paiement annulé ❌</h1>
    <p class="text-xl mb-6">Votre commande n'a pas été finalisée.</p>
    <button @click="$router.back()" class="btn-red px-6 py-3 rounded-lg hover:bg-red-600 transition">
      Retour
    </button>
  </div>
</template>

<script setup>
// Rien ici non plus
</script>

<style scoped>
.btn-red {
  background-color: #ef4444;
}
</style>
