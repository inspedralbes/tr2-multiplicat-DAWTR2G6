
<template>
  <div class="score-container">
    <h2>PUNTUACIO DE LA PARTIDA: {{ score }}</h2>
    <div class="v-if">
      <button @click="$router.push('/lobby')">Ves'ne al Lobby</button>
      <button @click="$router.push('/ranking')">Mira com vas al rankings!</button>
    </div>
    <h3 class="score-subtitle">Revisa les teves respostes incorrectes aqui!:</h3>
    <div class="score-form">
      <ul class="form-group">
        <li v-for="(question, index) in preguntas_falladas" :key="index" class="form-control">
          <p><strong>Question:</strong> {{ question }}</p>
          <p><strong>Your Answer:</strong> {{ partida_usuario_respuestas[index] }}</p>
          <p><strong>Correct Answer:</strong> {{ partida_respuestas[index] }}</p>
        </li>
      </ul>
    </div>
  </div>
</template>
    

<script>
export default {
  name: 'ScoreScreen',
  computed: {
    partida_preguntas() {
      return this.$store.state.partida_preguntas;
    },
    partida_respuestas() {
      return this.$store.state.partida_respuestas;
    },
    partida_usuario_respuestas() {
      return this.$store.state.partida_usuario_respuestas;
    },
    score() {
      let score = 0;
      for (let i = 0; i < this.partida_respuestas.length; i++) {
        if (this.partida_respuestas[i] === this.partida_usuario_respuestas[i]) {
          score++;
        }
      }
      return score;
    },
    incorrectAnswers() {
      let incorrect = [];
      for (let i = 0; i < this.partida_respuestas.length; i++) {
        if (this.partida_respuestas[i] !== this.partida_usuario_respuestas[i]) {
          incorrect.push(this.partida_preguntas[i]);
        }
      }
      return incorrect;
    },
  },
};
</script>
    
<style scoped>
.score-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background-color: #f4f4f4;
}

.score-title {
  font-family: 'Arial', sans-serif;
  font-size: 2em;
  color: #3498db;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.2);
  margin-bottom: 20px;
}

.score-subtitle {
  font-family: 'Arial', sans-serif;
  font-size: 1.5em;
  color: #3498db;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.2);
  margin-bottom: 10px;
}

.score-form {
  width: 300px;
}

.form-group {
  margin-bottom: 15px;
}

.form-control {
  width: 100%;
  padding: 10px;
  box-sizing: border-box;
  border: 2px solid #3498db;
  border-radius: 5px;
  font-size: 1em;
  color: #333;
  outline: none;
}
</style>
