import { defineStore } from 'pinia';
import axios from 'axios';
import { useAuthStore } from '@/stores/auth';

export const useCsrfStore = defineStore('csrf', {
  state: () => ({
    csrfResponse: null as { status: string; message: string; vulnerability: string } | null,
  }),
  actions: {
    async transfer(amount: string, toAccount: string) {
      const authStore = useAuthStore();
      try {
        const response = await axios.post(
          'http://localhost:3000/attack/csrf',
          {
            amount,
            toAccount,
          },
          {
            headers: {
              Authorization: `Bearer ${authStore.token}`,
            },
          }
        );
        this.csrfResponse = response.data;
        return response;
      } catch (error) {
        console.error('Error al enviar CSRF:', error);
        throw error;
      }
    },

    async getTransferResponse() {
      const authStore = useAuthStore();
      try {
        const response = await axios.get('http://localhost:3000/attack/csrf/response', {
          headers: {
            Authorization: `Bearer ${authStore.token}`,
          },
        });
        this.csrfResponse = response.data;
        return response;
      } catch (error) {
        console.error('Error al obtener respuesta CSRF:', error);
        throw error;
      }
    },
  },
});
