<script setup lang="ts">
import RegisterForm from '@/components/RegisterForm.vue';
import { useAuthStore } from '@/stores/auth';
import { ref } from 'vue';

const isopen = ref(false);

const openModal = () => {
    isopen.value = true;
};

const closeModal = () => {
    isopen.value = false;
};

const email = ref('');
const password = ref('');
const authStore = useAuthStore();

const login = async () => {
    try {
        await authStore.login(email.value, password.value);
        await authStore.redirectToHome();
    } catch (error) {
        console.error(error);
    }
};
</script>

<template>
    <RegisterForm :isopen="isopen" :closeModal="closeModal" />
    <section class="min-h-screen flex items-center justify-center">
        <div class="w-full max-w-md bg-white rounded-2xl shadow-lg p-8 z-20">
            <h1 class="text-2xl font-bold text-gray-700 text-center mb-6">Iniciar sesión</h1>
            <form class="space-y-4" @submit.prevent="login">
                <div>
                    <label for="email" class="block text-sm font-medium text-gray-600">Correo electrónico</label>
                    <input v-model="email" type="email" name="email" id="email" class="w-full p-2.5 border-b-2 border-[#c0cfc7] focus:border-[#abbfb4] outline-none bg-transparent text-gray-700" placeholder="correo@empresa.com" required>
                </div>
                <div>
                    <label for="password" class="block text-sm font-medium text-gray-600">Contraseña</label>
                    <input v-model="password" type="password" name="password" id="password" class="w-full p-2.5 border-b-2 border-[#c0cfc7] focus:border-[#abbfb4] outline-none bg-transparent text-gray-700" placeholder="••••••••" required>
                </div>
                <a @click="openModal" class="text-teal-500 hover:text-teal-900 hover:cursor-pointer text-sm">¿No tienes cuenta?</a>
                <button type="submit" class="w-full bg-[#abbfb4] text-white py-2 rounded-lg hover:bg-[#6a8abb] transition-all my-2">Ingresar</button>
            </form>
        </div>
    </section>
</template>

<style scoped>
input::placeholder {
    color: #c0cfc7;
    opacity: 0.8;
}
</style>
