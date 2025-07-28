<template>
  <div class="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white">
    <div class="container mx-auto px-6 py-16">
      <div class="bg-gray-800/60 backdrop-blur-md rounded-xl border border-gray-700 p-10 shadow-lg">
        <h1 class="text-4xl font-bold mb-4 text-blue-400">À propos de nous</h1>
        <p class="text-gray-300 mb-6 text-lg leading-relaxed">
          Nous sommes passionnés par la technologie et l'innovation. Notre mission est de vous proposer les meilleures configurations PC
          adaptées à vos besoins, que ce soit pour le gaming, la création de contenu, ou une utilisation professionnelle.
        </p>

        <h2 class="text-2xl font-semibold mb-3 text-purple-400">Notre Vision</h2>
        <p class="text-gray-400 mb-6">
          Offrir une plateforme moderne, rapide et agréable à utiliser pour comparer, filtrer, et acheter les meilleures configurations PC du marché.
        </p>

        <h2 class="text-2xl font-semibold mb-3 text-pink-400">Contact</h2>
        <p class="text-gray-400">
          Une question ? Une suggestion ? Contactez-nous à 
          <a href="mailto:ryan.deschuyteneer@gmail.com" class="text-blue-500 hover:underline">ryan.deschuyteneer@gmail.com</a>.
        </p>

        <div class="mt-10 flex flex-wrap items-center gap-4">
          <router-link 
            to="/" 
            class="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-6 py-3 rounded-lg shadow-md transition duration-300 transform hover:scale-105"
          >
            Retour à l'accueil
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
// Pas de logique nécessaire ici pour cette page statique
</script>

<style scoped>
</style>
