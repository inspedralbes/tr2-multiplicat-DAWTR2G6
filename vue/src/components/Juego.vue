<template>
  <div class="greetings">
    <h3>JUEGO PAGE</h3>
    <button @click="handleClickEvent('1')">Opció 1 ({{ buttons.b1.clicks }})</button>
    <button @click="handleClickEvent('2')">Opció 2 ({{ buttons.b2.clicks }})</button>
    <button @click="handleClickEvent('3')">Opció 3 ({{ buttons.b3.clicks }})</button>
    <button @click="handleClickEvent('4')">Opció 4 ({{ buttons.b4.clicks }})</button>
    <router-link to="/votacions">Mira les votacions</router-link>
  </div>
</template>

<script>
export default {
  data() {
    return {
      buttons: {
        b1: { clicks: 0 },
        b2: { clicks: 0 },
        b3: { clicks: 0 },
        b4: { clicks: 0 }
      }
    };
  },
  methods: {
    handleClickEvent(option) {
      // Use computed property to get the button dynamically
      const button = this.buttons[`b${option}`];
      if (button) {
        button.clicks++;
      }
    }
  }
};
</script>
