<template>
  <div class="blocks-container">
    <div class="block"></div>
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

.blocks-container {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 60px;
}

.block {
  width: 100%;
  height: 60px;
  background-color: #1c1c1c;
  border: 1px solid #dfdfdf;
}
</style>
