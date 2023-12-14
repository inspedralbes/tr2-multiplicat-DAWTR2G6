<template>
  <body>

    <header>
      <h1>XIFRA XALADA</h1>
      <router-link to="/login" class="routerlink">INCIAR SESSIO</router-link>
      <router-link to="/register" class="routerlink">REGISTRARSE</router-link>
    </header>


    <div class="container">
      <section @click="mover_a_lobby('tiemps')" id="temps">
        <h2> Temps</h2>
      </section>

      <section @click="mover_a_lobby('volumen')" id="volumen">
        <h2> Volumen</h2>
      </section>

      <section @click="mover_a_lobby('longitud')" id="longitud">
        <h2> Longitud</h2>
      </section>

      <section @click="mover_a_lobby('capacitat')" id="capacitat">
        <h2> Capacitat</h2>
      </section>

      <section @click="mover_a_lobby('superficie')" id="superficie">
        <h2> Superficie</h2>
      </section>

      <section @click="mover_a_lobby('massa')" id="massa">
        <h2> Massa</h2>
      </section>
    </div>


    <footer>

    </footer>
  </body>
</template>

<script>
import { useStore } from "../store.js";
export default {
  name: 'LandingScreen',
  data() {
    return {

    }
  },
  methods: {
    mover_a_lobby(categoria) {
      const store = useStore();
      store.resetCategoria();
      store.setCategoria(categoria);
      this.$router.push('/GameScreen');
    },
  },
}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Anek+Bangla&display=swap');

/* Global styles */
html,
template,
body {
  padding: 0;
  margin: -10px;
  font-family: 'Anek Bangla', sans-serif;
  background-color: #dfdfdf;
  height: 100vh;
  background-repeat: repeat;
  overflow: hidden;
}

/* Header styles */
header {
  display: grid;
  background-color: #000;
  color: #f5f5f5;
  height: 120px;
  font-size: 20px;
  align-content: space-evenly;
  justify-content: space-evenly;
}

header h1 {
  position: fixed;
  top: 20px;
  left: 30px;
  margin: 0;
}

.routerlink {
  position: fixed;
  top: 10px;
  right: 40px;
  color: #f5f5f5;
  text-decoration: none;
  transition: text-decotration 0.2s ease-out;
  font-size: 30px;
}

.routerlink:nth-child(2) {
  top: 50px;
  right: 40px;
}

.routerlink:hover {
  color: #f5f5f5;
  text-decoration: underline;
  cursor: pointer;
}

*::selection {
  color: #f5f5f5;
  background-color: #1c1c1c;
}

/* Section styles */
section {
  margin-left: auto;
  margin-right: auto;
  background-color: #1c1c1c56;
  color: #dfdfdf;
  padding: 10px;
  border-left: 6px solid black;
  margin-top: 1.3%;
  width: 50%;
  transition: all 0.4s ease;
}

section:hover {
  background-blend-mode: darken;
  border-left: 6px solid #f5f5f5;
  color: #f5f5f5;
  cursor:pointer;
  transform: scale(1.03);
}

section:nth-child(1):hover {
  background-color: olivedrab;
}

section:nth-child(2):hover {
  background-color: saddlebrown;
}

section:nth-child(3):hover {
  background-color: darkcyan;
}

section:nth-child(4):hover {
  background-color: orangered;
}

section:nth-child(5):hover {
  background-color: crimson;
}

section:nth-child(6):hover {
  background-color: cornflowerblue;
}

section h2 {
  scale: 1.8;
  margin-left: 30%;
}

/* Footer styles */
footer {
  background-color: #000;
  padding: 30px;
  position: fixed;
  left: 0;
  bottom: 0;
  width: 100%;
}

/* Media query for mobile devices */
@media (max-width: 768px) {
  header {
    height: 80px;
    font-size: 16px;
  }

  header h1 {
    top: 10px;
    left: 20px;
  }

  .routerlink {
    top: 10px;
    right: 20px;
    font-size: 24px;
  }

  section {
    width: 90%;
    margin-top: 5%;
  }

  section h2 {
    margin-left: 30%;
  }
}
</style>
