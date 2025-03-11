<script setup lang="ts">
import LoginForm from '@/components/LoginForm.vue';
// import fondo from '@/components/img/fondo.jpg';
import { ref, onMounted, onUnmounted } from 'vue';

const trails = ref<{ x: number; y: number; id: number }[]>([]);

const addTrail = (event: MouseEvent) => {
  const id = Date.now();
  trails.value.push({ x: event.clientX, y: event.clientY, id });

  setTimeout(() => {
    trails.value = trails.value.filter(trail => trail.id !== id);
  }, 400);
};

onMounted(() => window.addEventListener('mousemove', addTrail));
onUnmounted(() => window.removeEventListener('mousemove', addTrail));
</script>

<template>
  <main class="bg min-h-screen relative">
    <div v-for="trail in trails" :key="trail.id"
      class="absolute w-6 h-6 bg-blue-400 rounded-full opacity-50 blur-lg"
      :style="{
        left: `${trail.x}px`,
        top: `${trail.y}px`,
        transform: 'translate(-50%, -50%)',
      }">
    </div>


    <LoginForm />
  </main>
</template>

<style scoped>
.bg {
  background-image: url('@/components/img/fondo.jpg');
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
}

main {
  transition: opacity 0.5s ease-out;
}
</style>
