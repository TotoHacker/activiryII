<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useCsrfStore } from '@/stores/ataques/csrf';

const amount = ref('');
const toAccount = ref('');
const csrfStore = useCsrfStore();
const csrfResponse = ref<{ status: string, message: string, vulnerability: string } | null>(null);

const sendTransfer = async () => {
  try {
    await csrfStore.transfer(amount.value, toAccount.value);
    console.log("Transferencia enviada con éxito");
  } catch (error) {
    console.error("Error al enviar la transferencia:", error);
  }
};

onMounted(() => {
  csrfStore.getTransferResponse().then(() => {
    if (csrfStore.csrfResponse) {
      csrfResponse.value = csrfStore.csrfResponse;
    }
  }).catch(error => {
    console.error("Error al cargar la respuesta de CSRF:", error);
  });
});
</script>

<template>
  <div class="flex justify-center items-center h-screen bg-gray-100">
    <div class="flex w-full max-w-5xl bg-white shadow-lg rounded-xl">
      <div class="flex-1 p-4 border-r border-gray-300">
        <h2 class="text-center text-xl font-semibold mb-4">Transferencia (Ataque CSRF)</h2>
        <input v-model="amount" type="number" class="w-full p-2 mb-4 border border-gray-300 rounded" placeholder="Monto" />
        <input v-model="toAccount" type="text" class="w-full p-2 mb-4 border border-gray-300 rounded" placeholder="Cuenta de destino" />
        <button @click="sendTransfer" class="w-full py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-all">
          Enviar Transferencia
        </button>
      </div>

      <div class="flex-1 p-4">
        <h2 class="text-center text-xl font-semibold mb-4">Resultado</h2>
        <div v-if="csrfResponse" class="p-4 border border-gray-300 rounded-lg">
          <p><strong>Status:</strong> {{ csrfResponse.status }}</p>
          <p><strong>Mensaje:</strong> {{ csrfResponse.message }}</p>
          <p><strong>Vulnerabilidad:</strong> {{ csrfResponse.vulnerability }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
