<script>
// import Juego from '@/Juego.vue';
import { socket } from '@/socket'
import { useAppStore } from '../stores/app.js'
import BotoVotacio from '@/BotoVotacio.vue';
export default {
  components: {BotoVotacio},
  data() {
    return {

    };
  },
  methods: {
    updateButtonClicks(buttons) {
      this.buttons = { ...buttons };
    },
    voto(id) {
      socket.emit('votacion', id);
    }
  },
  computed: {
    votos() {
      const store = useAppStore();
      return store.getVotos();
    }
  },
  created() {
    // Listen for the "actualizacionVotos" event and update the button clicks
    socket.on("actualizacionVotos", (newButtons) => {
      this.updateButtonClicks(newButtons);
    });
  },
};
</script>


<template>
  <BotoVotacio v-for="actual in 4" id:="actual-1"></BotoVotacio>

</template>


