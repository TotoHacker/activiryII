<script setup lang="ts">
import { defineProps, ref, computed } from 'vue';
import axios from 'axios';
import router from '@/router';
import logo from '@/components/img/logo.jpg';
import Swal from 'sweetalert2';
import useVuelidate from '@vuelidate/core';
import { required, email, minLength, sameAs } from '@vuelidate/validators';

defineProps<{ isopen: boolean; closeModal: () => void; }>();

const emailField = ref("");
const passwordField = ref("");
const confirmPasswordField = ref("");
const errorMessage = ref("");

const rules = computed(() => ({
  emailField: { required, email },
  passwordField: { required, minLength: minLength(6) },
  confirmPasswordField: { required, sameAs: sameAs(passwordField) }
}));

const v$ = useVuelidate(rules, { emailField, passwordField, confirmPasswordField });

async function handleRegister() {
  const isValid = await v$.value.$validate();
  if (!isValid) return;

  try {
    const response = await axios.post("http://localhost:3000/users/register", {
      email: emailField.value,
      password: passwordField.value,
    });

    console.log("Registro exitoso", response.data);
    showAlert();
    router.push("/");
  } catch (error) {
    console.error("Error al registrar", error);
    errorMessage.value = "Hubo un error al registrar el usuario.";
  }
}

const showAlert = () => {
  Swal.fire({
    title: '¡Éxito!',
    text: 'Has realizado una acción exitosa.',
    icon: 'success',
    confirmButtonText: 'Aceptar'
  });
};
</script>

<template>
  <div v-if="isopen" class="fixed inset-0 flex items-center justify-center z-50">
    <div class="absolute bg-black opacity-40 -z-20 w-full h-full"></div>
    <div class="bg-white p-6 rounded-2xl shadow-lg w-full max-w-md">
      <button @click="closeModal" class="text-gray-500 hover:text-gray-700 text-xl">&times;</button>

      <div class="flex flex-col justify-between items-center mb-4">
        <h2 class="text-lg font-semibold text-gray-700">Registro</h2>
        <img :src="logo" alt="logo" class="relative w-44 rounded-full" />
      </div>

      <div v-if="errorMessage" class="text-red-500 text-sm mb-4">{{ errorMessage }}</div>

      <form @submit.prevent="handleRegister" class="space-y-4">
        <div>
          <label class="block text-sm text-gray-600">Email</label>
          <input v-model="emailField" type="email" class="w-full border-b-2 border-gray-300 focus:border-[#abbfb4] outline-none p-2 bg-transparent" required />
          <span v-if="v$.emailField.$error" class="text-red-500 text-sm">{{ v$.emailField.$errors[0].$message }}</span>
        </div>

        <div>
          <label class="block text-sm text-gray-600">Contraseña</label>
          <input v-model="passwordField" type="password" class="w-full border-b-2 border-gray-300 focus:border-[#abbfb4] outline-none p-2 bg-transparent" required />
          <span v-if="v$.passwordField.$error" class="text-red-500 text-sm">{{ v$.passwordField.$errors[0].$message }}</span>
        </div>

        <div>
          <label class="block text-sm text-gray-600">Confirmar contraseña</label>
          <input v-model="confirmPasswordField" type="password" class="w-full border-b-2 border-gray-300 focus:border-[#abbfb4] outline-none p-2 bg-transparent" required />
          <span v-if="v$.confirmPasswordField.$error" class="text-red-500 text-sm">Las contraseñas no coinciden.</span>
        </div>

        <button type="submit" class="w-full bg-[#abbfb4] text-white py-2 rounded-lg hover:bg-[#c0cfc7] transition-all">
          Registrarse
        </button>
      </form>
    </div>
  </div>
</template>

<style scoped>
input::placeholder {
  color: #c0cfc7;
  opacity: 0.8;
}
</style>
