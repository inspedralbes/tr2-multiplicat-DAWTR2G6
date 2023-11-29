<template>
    <div class="fondo">
        ESTO SON LAS VOTACIONES
        <Button @click="voto(0)" label="1"></Button>
        {{ votos[0] }}
        <Button @click="voto(1)" label="2"></Button>
        {{ votos[1] }}
        <Button @click="voto(2)" label="3"></Button>
        {{ votos[2] }}
        <Button @click="voto(3)" label="4"></Button>
        {{ votos[3] }}

    </div>
</template>

<script>
import { socket } from "@/socket";
import { useAppStore } from '@/stores/app';

export default {
    data() {
        return {

        }
    },
    methods: {
        voto(id) {
            socket.emit('votacion', id)
        }
    },
    computed: {
        votos() {
            const store = useAppStore();
            return store.getVotos();
        }
    }
}
</script>

<style lang="scss" scoped>
    .fondo{
  background-size: cover;
  background-repeat: no-repeat;
  height: 100vh;
 
}
</style>
