<script setup lang="ts">

</script>

<template>
  <div class="flex items-center justify-center h-screen bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500">
    <div class="text-center">
      <div class="animate__animated animate__fadeIn animate__delay-1s">
        <h1 class="text-9xl font-extrabold text-white mb-6 animate__animated animate__fadeIn">
          404
        </h1>
        <p class="text-2xl text-white mb-6 animate__animated animate__fadeIn animate__delay-1s">
          Lo siento, la página no existe.
        </p>
        <p class="text-lg text-white mb-6 animate__animated animate__fadeIn animate__delay-2s">
          Parece que algo salió mal... pero no te preocupes, ¡estás a salvo aquí!
        </p>
        <router-link to="/" class="px-6 py-3 text-lg font-semibold text-indigo-800 bg-white rounded-md shadow-md hover:bg-gray-100 hover:scale-105 transform transition duration-300">
          Volver al inicio
        </router-link>
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>
