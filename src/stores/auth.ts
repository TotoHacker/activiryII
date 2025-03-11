import { defineStore } from 'pinia';
import axios from 'axios';
import router from '@/router';

export const useAuthStore = defineStore('auth', {
  state: () => ({
    token: '',
    userId: '',
    role: '',
  }),
  actions: {
    async login(email: string, password: string) {
      try {
        const response = await axios.post('http://localhost:3000/users/login', {
          email,
          password
        });

        this.token = response.data.token;
        this.userId = response.data.id;
        this.role = response.data.role;

        localStorage.setItem('token', this.token);
        localStorage.setItem('userId', this.userId.toString());
        localStorage.setItem('role', this.role);

        return response;
      } catch (error) {
        console.error(error);
        throw error;
      }
    },

    async redirectToHome() {
      try {
        if (this.token) {
          await router.push('/home');
        }
      } catch (error) {
        console.error('Error al redirigir a la página de inicio:', error);
        throw error;
      }
    },

    async logout() {
      try {
        await axios.post('http://localhost:3000/users/logout', {
          token: this.token,
        });

        this.token = '';
        this.userId = '';
        this.role = '';
        localStorage.removeItem('token');
        localStorage.removeItem('userId');
        localStorage.removeItem('role');
        router.push('/');
      } catch (error) {
        console.error('Error al hacer logout:', error);
        throw error;
      }
    },

    loadUserFromLocalStorage() {
      this.userId = localStorage.getItem('userId') || '';
      this.token = localStorage.getItem('token') || '';
      this.role = localStorage.getItem('role') || '';
    },
  },
});
