<template>
  <div class="post-juego-container">
    <h2 class="post-juego-title mt-5">Pantalla Post Juego</h2>

    <div v-if="preguntas.length > 0" class="resultados-container">
      <h3>Resultados de la Partida:</h3>

      <ul class="resultados-list">
        <li v-for="(pregunta, index) in preguntas" :key="index" class="resultado-item">
          <strong>Pregunta {{ index + 1 }}:</strong> {{ pregunta }}
          <br>
          <strong>Respuesta Correcta:</strong> {{ respuestas[index] }}
        </li>
      </ul>
    </div>

    <div class="links-container">
      <router-link to="/" class="nav-link">Volver a la Página Principal</router-link>
      <router-link to="/lobby" class="nav-link">Volver al Lobby</router-link>
    </div>
  </div>
</template>

<script>
export default {
  name: 'PostJuegoScreen',
  data() {
    return {
      preguntas: [],
      respuestas: [],
    };
  },
  created() {
    // Obtener los parámetros de la URL (preguntas y respuestas)
    this.preguntas = this.$route.query.preguntas || [];
    this.respuestas = this.$route.query.respuestas || [];
  },
};
</script>

<style scoped>
.post-juego-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background-color: #f4f4f4;
}

.post-juego-title {
  font-size: 2em;
  color: #3498db;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.2);
  margin-bottom: 20px;
}

.resultados-container {
  margin-top: 20px;
}

.resultados-list {
  list-style-type: none;
  padding: 0;
}

.resultado-item {
  margin: 10px 0;
  color: #555;
  font-size: 1.2em;
}

.links-container {
  margin-top: 20px;
}

.nav-link {
  text-decoration: none;
  color: #3498db;
  font-size: 1.1em;
  margin: 0 10px;
  padding: 10px;
  border: 1px solid #3498db;
  border-radius: 5px;
  transition: background-color 0.3s ease;
}

.nav-link:hover {
  background-color: #3498db;
  color: #fff;
}

/* Add any additional styles based on your preferences */
</style>
