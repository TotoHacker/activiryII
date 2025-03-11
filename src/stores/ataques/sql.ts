import { defineStore } from 'pinia';
import axios from 'axios';
import { useAuthStore } from '@/stores/auth';

export const useSqlInjectionStore = defineStore('sqlInjection', {
  state: () => ({
    sqlInjectionResponse: null as { status: string; message: string; vulnerability: string } | null,
  }),
  actions: {
    async searchUser(searchTerm: string) {
      const authStore = useAuthStore();
      try {
        const response = await axios.get(
          'http://localhost:3000/attack/sql-injection',
          {
            params: { term: searchTerm },
            headers: {
              Authorization: `Bearer ${authStore.token}`,
            },
          }
        );
        // Aquí asignamos la respuesta a sqlInjectionResponse
        this.sqlInjectionResponse = response.data;
      } catch (error) {
        console.error('Error al buscar SQL:', error);
        throw error;
      }
    },

    async getSqlInjectionResponse() {
      const authStore = useAuthStore();
      try {
        const response = await axios.get('http://localhost:3000/attack/sql-injection/response', {
          headers: {
            Authorization: `Bearer ${authStore.token}`,
          },
        });
        this.sqlInjectionResponse = response.data;
      } catch (error) {
        console.error('Error al obtener respuesta SQL:', error);
        throw error;
      }
    },
  },
});
