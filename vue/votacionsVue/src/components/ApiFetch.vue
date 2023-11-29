<!-- ApiFetch.vue -->

<template>
  <div>
    <button @click="fetchData">Obtener preguntas</button>
    <div v-if="responseData">
      <h2>Respuesta de poldoña.com:</h2>
      <pre>{{ responseData }}</pre>
    </div>
    <div v-if="error">
      <h2>Error:</h2>
      <pre>{{ error }}</pre>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      responseData: null,
      error: null,
    };
  },
  methods: {
    fetchData() {
      const apiUrl = 'https://localhost/api/enviar-preguntas-unidades';

      fetch(apiUrl)
        .then(response => {
          if (!response.ok) {
            throw new Error(`Error de red: ${response.status}`);
          }
          return response.json();
        })
        .then(data => {
          this.responseData = data; // Ajusta según la estructura de tu respuesta
          console.log('Preguntas recibidas:', data); // Agrega este console.log
        })
        .catch(error => {
          console.error(error);
          this.error = error.message;
        });
    },
  },
};
</script>
