<template>
  <div class="container">
    <h3 class="mt-3">Pregunta</h3>
    <p class="lead">{{ pregunta }}</p>
    <!-- Opciones de respuesta -->
    <div class="form-check" v-for="(option, index) in options" :key="index">
      <input class="form-check-input" type="radio" :id="'option' + index" v-model="selectedOption" :value="option">
      <label class="form-check-label" :for="'option' + index">{{ option }}</label>
    </div>
    <button class="btn btn-primary mt-3" @click="submitAnswer">Responder</button>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'QuestionElement',
  data() {
    return {
      pregunta: '',
      options: [], // Las opciones de respuesta se cargarán desde el servidor
      selectedOption: null,
      currentQuestion: null
    };
  },
  mounted() {
    // Cargar la primera pregunta cuando el componente se monta
    this.loadNextQuestion();
  },
  methods: {
    submitAnswer() {
      // Enviar la respuesta seleccionada al servidor mediante Socket.IO
      this.$emit('answer', this.selectedOption);
      // Limpiar la selección después de enviar la respuesta
      this.selectedOption = null;
      // Cargar la próxima pregunta si es diferente a la actual
      this.loadNextQuestion();
    },
    loadNextQuestion() {
      // Realizar la solicitud al servidor para obtener la próxima pregunta
      axios.get('http://localhost/api/recibir-preguntas-unidades')
        .then(response => {
          // Verificar si la nueva pregunta es diferente a la actual
          if (response.data.pregunta !== this.currentQuestion) {
            // Actualizar los datos del componente con la próxima pregunta y opciones recibidas
            this.pregunta = response.data.pregunta;
            this.options = response.data.opciones;
            // Actualizar la pregunta actual
            this.currentQuestion = response.data.pregunta;
          } else {
            // Si es la misma pregunta, intentar cargar otra vez
            this.loadNextQuestion();
          }
        })
        .catch(error => {
          console.error('Error al obtener la próxima pregunta:', error);
        });
    }
  }
};
</script>

<style scoped>
/* No se necesitan estilos específicos aquí */
</style>
