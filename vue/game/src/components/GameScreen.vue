<template>
    <div>
        ESTO ES UN BOTON PRIMEVUE(npm install -D sass)

       
        
    <div class="card flex justify-content-center flex-wrap gap-3">
        <router-link to="/Juego">
        <Button class="custom-warning-button" label="Warning" severity="warning" >Jugar!</Button>
    </router-link>


    </div>

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
.custom-warning-button {
  // Agrega estilos personalizados aquí
  margin-top: 234px; // Ejemplo de modificación de la posición
  // Otras propiedades de estilo según sea necesario
}
</style>