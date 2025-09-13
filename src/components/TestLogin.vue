<template>
    <button @click="testLogin">Tester login</button>
</template>
  
  <script setup>
  import {login}  from '../services/api.js'
  
  const testLogin = async () => {
    try {
      const data = await login('test123456@example.com', 'motdepasse')
      console.log('Réponse backend:', data)
    } catch (err) {
      console.error('Erreur backend:', err)
    }
  }
  </script>
  