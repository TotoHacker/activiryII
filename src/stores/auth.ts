import { defineStore } from 'pinia'
import axios from 'axios'
import router from '@/router';
export const useAuthStore = defineStore('auth',{
  state: () => ({
    user: null,
    token: '',
  }),
  actions: {
    async login(email:string, password:string) {
      try {
        const response = await axios.post('http://localhost:3000/users/login', {
          email,
          password
        })
        this.token = response.data.token
        this.user = response.data.user
        localStorage.setItem('token', this.token)
        router.push('/home');
        return response
      } catch (error) {
        console.error(error)
        throw error
      }
    },
    logout() {
      this.token = ''
      this.user = null
      localStorage.removeItem('token')
    }
  },
});
