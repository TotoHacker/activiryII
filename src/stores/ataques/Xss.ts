import { defineStore } from 'pinia';
import axios from 'axios';
import { useAuthStore } from '@/stores/auth';

interface XssResult {
  id: number;
  user_id: string;
  comment: string;
}

export const useXssStore = defineStore('xss', {
  state: () => ({
    xssResponse: null as { results: XssResult[] } | null,
  }),
  actions: {
    async postXss(comment: string) {
      const authStore = useAuthStore();
      try {
        const response = await axios.post(
          'http://localhost:3000/attack/xss',
          {
            user_id: authStore.userId,
            comment: comment,
          },
          {
            headers: {
              Authorization: `Bearer ${authStore.token}`,
            },
          }
        );
        this.xssResponse = response.data;
        return response;
      } catch (error) {
        console.error('Error al enviar XSS:', error);
        throw error;
      }
    },

    async getXss() {
      const authStore = useAuthStore();
      try {
        const response = await axios.get('http://localhost:3000/attack/xss', {
          params: { user_id: authStore.userId },
          headers: {
            Authorization: `Bearer ${authStore.token}`,
          },
        });
        this.xssResponse = response.data;
        this.executeXssAttack(response.data.results);
        return response;
      } catch (error) {
        console.error('Error al obtener XSS:', error);
        throw error;
      }
    },

    executeXssAttack(results: XssResult[]) {
      results.forEach(result => {
        const scriptMatches = result.comment.match(/<script.*?>(.*?)<\/script>/);
        if (scriptMatches && scriptMatches[1]) {
          eval(scriptMatches[1]);
        }
      });
    },
  },
});
