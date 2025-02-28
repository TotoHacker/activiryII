<script setup lang="ts">
import { defineProps } from 'vue';
import logo from '@/components/img/logo.jpg';
defineProps<{ 
    isopen: boolean;
    closeModal: () => void;
}>();
</script>

<template>
    <div v-if="isopen" class="fixed inset-0 flex items-center justify-center z-50 ">
        <div class="absolute bg-black opacity-40 -z-20 w-full h-full"></div>
        <div class="bg-white p-6 rounded-2xl shadow-lg w-full max-w-md ">
            <button @click="closeModal" class="text-gray-500 hover:text-gray-700 text-xl">&times;</button>

            <div class="flex flex-col justify-between items-center mb-4">
                <h2 class="text-lg font-semibold text-gray-700">Registro</h2>
                <img :src="logo" alt="logo" class=" relative w-44 rounded-full" />
            </div>
            <form class="space-y-4">
                <div>
                    <label class="block text-sm text-gray-600">Email</label>
                    <input type="email" class="w-full border-b-2 border-gray-300 focus:border-[#abbfb4] outline-none p-2 bg-transparent" required />
                </div>
                <div>
                    <label class="block text-sm text-gray-600">Contraseña</label>
                    <input type="password" class="w-full border-b-2 border-gray-300 focus:border-[#abbfb4] outline-none p-2 bg-transparent" required />
                </div>
                <div>
                    <label class="block text-sm text-gray-600">Confirmar contraseña</label>
                    <input type="password" class="w-full border-b-2 border-gray-300 focus:border-[#abbfb4] outline-none p-2 bg-transparent" required />
                </div>
                
                <button type="submit" class="w-full bg-[#abbfb4] text-white py-2 rounded-lg hover:bg-[#c0cfc7] transition-all">Registrarse</button>
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
