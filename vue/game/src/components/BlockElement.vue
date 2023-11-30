<template>
  <div class="container">
    <h3 class="mt-3">Bloque de Tetris</h3>
    <p class="lead">Cantidad: {{ cantidad }}</p>
    <!-- Representación gráfica del bloque de Tetris -->
    <div class="tetris-block"></div>
  </div>
</template>

<script>
export default {
  name: 'BlockElement',
  props: ['cantidad']
};
</script>

<style scoped>
/* Estilos específicos para este componente */
.tetris-block {
  width: 50px;
  height: 50px;
  background-color: blue;
  /* Agrega estilos adicionales según sea necesario */
}
</style>
