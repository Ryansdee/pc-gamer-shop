<template>
  <div class="min-h-screen flex flex-col justify-center items-center bg-green-900 text-white p-6">
    <h1 class="text-5xl font-bold mb-6">Paiement réussi 🎉</h1>
    <p class="text-xl mb-6">Merci pour votre commande ! Vous allez recevoir un email de confirmation.</p>
    <button @click="$router.push('/')" class="btn-blue px-6 py-3 rounded-lg hover:bg-blue-600 transition">
      Retour à l'accueil
    </button>
  </div>
</template>

<script setup>
// Rien de spécial ici
</script>

<style scoped>
.btn-blue {
  background-color: #3b82f6;
}
</style>
