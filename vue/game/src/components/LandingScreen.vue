<template>
  <header>
    <h1>XIFRA XALADA</h1>
    <router-link to="/login" >Iniciar sesión</router-link>
    <router-link to="/register">Registrarse</router-link>
  </header>


  <div class="container">
    <section id="temps">
      <h2>Temps</h2>

    </section>

    <section id="volumen">
      <h2>Volumen</h2>
    </section>

    <section id="longitud">
      <h2>Longitud</h2>

    </section>

    <section id="capacitat">
      <h2>Capacitat</h2>

    </section>

    <section id="superficie">
      <h2>Superficie</h2>

    </section>

    <section id="massa">
      <h2>Massa</h2>

    </section>
  </div>


  <footer>

  </footer>
</template>

<script>
export default {
  name: 'LandingScreen'
};
</script>

<style scoped>


body {
  font-family: 'Anek Bangla', sans-serif;
  background: linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0)), url("../../../../");

  background-repeat: repeat;
  margin: 0;
  padding: 0;
  overflow: x-hidden;
  overflow: hidden;
}

header {
  background-color: #000;
  color: #f5f5f5;
  padding: 20px;
  text-align: center;
}

header h1 {
  margin-right: 70%;
  font-size: 60px;
  margin: 0;
}



*::selection {
  color: #f5f5f5;
  background-color: #1c1c1c;
}

.container {
  width: 100%;
  margin-left: 30%;
}


section {
  margin-left: 21%;
  background-color: #f5f5f5;
  color: #1c1c1c;
  padding: 10px;
  border-top: 6px solid ;
  border-left: 6px solid #1c1c1c;
  margin-top: 1%;
  width: 1000px;
  transition: all 0.5s ease;
  opacity: 0.93;
}

section:hover {
  border-top: 6px solid #f5f5f5;
  border-left: 6px solid #f5f5f5;
  transform: translateX(-70px);
  color: #f5f5f5;
  opacity: 1;
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
  transform: scale(1.8);
  margin-left: 30%;
}

footer {
  background-color: #000;
  padding: 20px;
  position: fixed;
  left: 0;
  bottom: 0;
  width: 100%;
}
</style>
