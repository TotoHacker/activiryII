<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useXssStore } from '@/stores/ataques/Xss';

const inputCode = ref('');
const xssStore = useXssStore();
const xssResults = ref<{ id: number; user_id: string; comment: string }[]>([]);

onMounted(() => {
  xssStore.getXss().then(() => {
    if (xssStore.xssResponse) {
      xssResults.value = xssStore.xssResponse.results;
    }
  }).catch(error => {
    console.error("Error al cargar los ataques XSS:", error);
  });
});


const sendCode = async () => {
  try {
    await xssStore.postXss(inputCode.value);
    console.log("Código enviado con éxito");
  } catch (error) {
    console.error("Error al enviar el código:", error);
  }
};
</script>

<template>
  <div class="flex justify-center items-center h-screen bg-gray-100">
    <div class="flex w-full max-w-5xl bg-white shadow-lg rounded-xl">
      <div class="flex-1 p-4 border-r border-gray-300">
        <h2 class="text-center text-xl font-semibold mb-4">Entrada de código ataque Xss</h2>
        <textarea
          v-model="inputCode"
          class="w-full h-64 p-4 border border-gray-300 rounded-lg"
          placeholder="Escribe tu código aquí..."
        ></textarea>
        <button
          @click="sendCode"
          class="w-full mt-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-all"
        >
          Enviar ejemplo
        </button>
      </div>

      <div class="flex-1 p-4">
        <h2 class="text-center text-xl font-semibold mb-4">Salida</h2>
        <div class="w-full h-64 p-4 border border-gray-300 rounded-lg">
          <div v-text="inputCode">

          </div>
          <div v-for="result in xssResults" :key="result.id" class="mt-4 p-2 bg-gray-200 border rounded">
          <div v-text="result.comment"></div>
        </div>
        </div>
        <div v-for="result in xssResults" :key="result.id" class="mt-4 p-2 bg-gray-200 border rounded">
            <div v-html="result.comment"></div>
          </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
</style>
