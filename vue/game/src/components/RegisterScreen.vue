<!-- RegisterScreen.vue -->

<template>
    <div class="surface-card p-4 shadow-2 border-round w-full lg:w-6">
      <div class="text-center mb-5">
        <div class="text-900 text-3xl font-medium mb-3">Create an Account</div>
        <span class="text-600 font-medium line-height-3">Already have an account?</span>
        <router-link to="/login" class="font-medium no-underline ml-2 text-blue-500 cursor-pointer">Login here</router-link>
      </div>
  
      <form @submit.prevent="register">
        <label for="username" class="block text-900 font-medium mb-2">Username</label>
        <input id="username" type="text" class="w-full mb-3" v-model="username" />
  
        <label for="email" class="block text-900 font-medium mb-2">Email</label>
        <input id="email" type="email" class="w-full mb-3" v-model="email" />
  
        <label for="password" class="block text-900 font-medium mb-2">Password</label>
        <input id="password" type="password" class="w-full mb-3" v-model="password" />
  
  
        <button type="submit" class="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600">Register</button>
      </form>
    </div>
  </template>
  
  <script>
  import { useAppStore } from '@/stores/app';
  
  export default {
    data() {
      return {
        username: '',
        email: '',
        password: '',
      };
    },
    methods: {
      register() {
        const appStore = useAppStore();
  
        this.$router.push('/GameScreen');
      },
    },
  };
  </script>
  
  <style lang="scss" scoped>
  </style>
  