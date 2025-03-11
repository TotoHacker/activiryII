import { defineStore } from 'pinia';
import axios from 'axios';
import { useAuthStore } from '@/stores/auth';

export const useJwtStore = defineStore('jwt', {
  state: () => ({
    jwtResponse: null as { status: string; message: string; vulnerability: string } | null,
  }),
  actions: {
    async verifyJwt(token: string) {
      const authStore = useAuthStore();
      try {
        const response = await axios.post(
          'http://localhost:3000/attack/jwt/verify',
          {
            token,
          },
          {
            headers: {
              Authorization: `Bearer ${authStore.token}`,
            },
          }
        );
        this.jwtResponse = response.data;
        return response;
      } catch (error) {
        console.error('Error al verificar JWT:', error);
        throw error;
      }
    },

    async getJwtResponse() {
      const authStore = useAuthStore();
      try {
        const response = await axios.get('http://localhost:3000/attack/jwt/response', {
          headers: {
            Authorization: `Bearer ${authStore.token}`,
          },
        });
        this.jwtResponse = response.data;
        return response;
      } catch (error) {
        console.error('Error al obtener respuesta JWT:', error);
        throw error;
      }
    },
  },
});
