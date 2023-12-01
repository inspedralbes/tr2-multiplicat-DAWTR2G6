<template>
  <div class="block-element-container">
    <!-- Representación gráfica del bloque de Tetris -->
    <div class="tetris-block">
      <div class="tetris-piece"></div>
    </div>
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

.block-element-container {
  display: flex;
  justify-content: center;
  margin-top: 20px;
}

.tetris-block {
  display: flex;
}

.tetris-piece {
  width: 70px;
  height: 70px;
  background-color: #3498db;
  border: 1px solid #2980b9;
  border-radius: 3px;
  margin: 2px;
}

/* Puedes agregar estilos adicionales según sea necesario para otras piezas de Tetris */
</style>
