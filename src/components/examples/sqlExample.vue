<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useSqlInjectionStore } from '@/stores/ataques/sql.ts';

const searchTerm = ref('');
const sqlResponse = ref<{ status: string; message: string; vulnerability: string } | null>(null);

const searchUser = async () => {
  try {
    const store = useSqlInjectionStore();
    await store.searchUser(searchTerm.value);
    sqlResponse.value = store.sqlInjectionResponse; // Actualizamos el valor de sqlResponse
    console.log("Búsqueda realizada con éxito");
  } catch (error) {
    console.error("Error al realizar la búsqueda:", error);
  }
};

onMounted(() => {
  const store = useSqlInjectionStore();
  store.getSqlInjectionResponse().then(() => {
    sqlResponse.value = store.sqlInjectionResponse; // Cargamos la respuesta inicial
  }).catch(error => {
    console.error("Error al cargar la respuesta SQL:", error);
  });
});
</script>

<template>
  <div class="flex justify-center items-center h-screen bg-gray-100">
    <div class="flex w-full max-w-5xl bg-white shadow-lg rounded-xl">
      <div class="flex-1 p-4 border-r border-gray-300">
        <h2 class="text-center text-xl font-semibold mb-4">Búsqueda SQL (Injection)</h2>
        <input v-model="searchTerm" type="text" class="w-full p-2 mb-4 border border-gray-300 rounded" placeholder="Buscar Usuario" />
        <button @click="searchUser" class="w-full py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-all">
          Buscar
        </button>
      </div>

      <div class="flex-1 p-4">
        <h2 class="text-center text-xl font-semibold mb-4">Resultado</h2>
        <div v-if="sqlResponse" class="p-4 border border-gray-300 rounded-lg">
          <p><strong>Status:</strong> {{ sqlResponse.status }}</p>
          <p><strong>Mensaje:</strong> {{ sqlResponse.message }}</p>
          <p><strong>Vulnerabilidad:</strong> {{ sqlResponse.vulnerability }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
