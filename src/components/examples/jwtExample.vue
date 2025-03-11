<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useJwtStore } from '@/stores/ataques/Jwt.ts';
const jwtResponse = ref<{ status: string; message: string; vulnerability: string } | null>(null);
const token = ref('');

const verifyJwt = async () => {
  try {
    await useJwtStore().verifyJwt(token.value);
    console.log("Token verificado con éxito");
  } catch (error) {
    console.error("Error al verificar el token:", error);
  }
};

onMounted(() => {
  useJwtStore().getJwtResponse().then(() => {
    if (jwtResponse.value) {
      jwtResponse.value = jwtResponse.value;
    }
  }).catch(error => {
    console.error("Error al cargar la respuesta JWT:", error);
  });
});
</script>

<template>
  <div class="flex justify-center items-center h-screen bg-gray-100">
    <div class="flex w-full max-w-5xl bg-white shadow-lg rounded-xl">
      <div class="flex-1 p-4 border-r border-gray-300">
        <h2 class="text-center text-xl font-semibold mb-4">Verificación JWT</h2>
        <input v-model="token" type="text" class="w-full p-2 mb-4 border border-gray-300 rounded" placeholder="Token JWT" />
        <button @click="verifyJwt" class="w-full py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-all">
          Verificar Token
        </button>
      </div>

      <div class="flex-1 p-4">
        <h2 class="text-center text-xl font-semibold mb-4">Resultado</h2>
        <div v-if="jwtResponse" class="p-4 border border-gray-300 rounded-lg">
          <p><strong>Status:</strong> {{ jwtResponse.status }}</p>
          <p><strong>Mensaje:</strong> {{ jwtResponse.message }}</p>
          <p><strong>Vulnerabilidad:</strong> {{ jwtResponse.vulnerability }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
