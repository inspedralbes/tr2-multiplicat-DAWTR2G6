<template>
    <div>
        <button @click="voto(id)" label="1">Vote</button>
    </div>
</template>

<script>
import { useAppStore } from '@/stores/app';
import { socket } from '@/socket';

export default {
    props: {
        id: {
            type: Number,
            required: true
        }
    },
    methods: {
        voto(id) {
            socket.emit('votacion', id);
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

<style lang="scss" scoped></style>
