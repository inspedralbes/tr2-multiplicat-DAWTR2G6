<template>
  <div class="container">
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

div{
  border: 2px solid black;
}

.tetris-block {
  width: 50px;
  height: 50px;
  background-color: transparent;
  position: relative;
}

.tetris-piece {
  position: absolute;
  width: 50px;
  height: 50px;
  background-color: red;
  border: 2px solid yellow;
}

/* Puedes agregar estilos adicionales según sea necesario para otras piezas de Tetris */
</style>
