<template>
  <div>
    <div class="overlay"></div>

    <header>
      <div class="login-register-btn">
        <router-link to="/login" class="routerlink">
          <button class="login-btn">Iniciar Sesión</button>
        </router-link>
        <router-link to="/register" class="routerlink">
          <button class="register-btn">Registrarse</button>
        </router-link>
      </div>
    </header>
    <div class="container">
      <h1>Selecciona una Categoría</h1>

      <div v-for="(category, index) in categories" :key="index" class="category" @click="selectCategory(category.id)">
        <img :src="category.image" :alt="category.alt">
        <div   class="category-content">
          <h2 >{{ category.title }}</h2>
          <p>{{ category.description }}</p>
         
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import  { useStore } from '../store';
export default { 
  data() {
    return {
      categories: [
        {
          id: 'volumen',
          image: './public/VOLUM.jpg',
          alt: 'Volumen matemático',
          title: 'Volum',
          description: 'Sumérgete en la emoción del juego mientras calculas volúmenes virtuales, desde pequeñas gotas hasta vastos océanos. ¡Ajusta tu precisión y descubre el poder de medir en 3D!',
        },
        {
          id: 'massa',
          image: './public/MASA.jpg',
          alt: 'Masa',
          title: 'Massa',
          description: '¡Equilibra la diversión y el aprendizaje al desafiar tu destreza con masas variadas! Domina la ciencia detrás de la balanza virtual y conviértete en el maestro de la masa exacta.',
        },
        {
          id: 'capacitat',
          image: './public/CAPACIDAD.jpg',
          alt: 'Capacitat',
          title: 'Capacitat',
          description: 'Llena tu experiencia de juego con desafíos de capacidad, desde tazas hasta barriles. ¡Mide con precisión y perfecciona tus habilidades para estimar volúmenes en situaciones del mundo real!',
        },

        {
          id: 'temps',
          image: './public/TIEMPO.jpg',
          alt: 'Temps',
          title: 'Temps',
          description: 'Atrévete a viajar en el tiempo virtualmente mientras resuelves rompecabezas temporales. ¡Mide con precisión intervalos y domina la cuarta dimensión en este juego emocionante!',
        },


        {
          id: 'superficie',
          image: './public/SUPERFICIE.jpg',
          alt: 'Superficie',
          title: 'Superficie',
          description: 'Enfréntate a desafíos que abarcan desde pequeñas áreas hasta vastos paisajes. ¡Perfecciona tu habilidad para calcular superficies y conquista el juego mientras te conviertes en el rey de las mediciones bidimensionales!',
        },


        {
          id: 'longitut',
          image: './public/LONGITUT.jpg',
          alt: 'Longitut',
          title: 'Longitut',
          description: 'Explora mundos virtuales con desafíos de longitud que van desde el microcosmos hasta galaxias lejanas. ¡Afina tus habilidades de medición y conviértete en el héroe de la dimensión lineal!',
        },
      ],
    };
  },
  methods: {
    selectCategory(categoryId) {
      // Lógica para manejar la selección de categoría
      console.log('Selected category:', categoryId);
      const store = useStore();
      store.resetCategoria();
      store.setCategoria(categoryId);
      this.$router.push('/GameScreen');
      // Puedes agregar más lógica según tus necesidades, como navegar a otra página, etc.
    },
    
  },
};
</script>

<style>
@import url('https://fonts.cdnfonts.com/css/tetris');

body {
  margin: 0;
  padding: 0;
  font-family: 'Tetris', sans-serif;
  background: url('https://i.pinimg.com/originals/2f/f9/4d/2ff94dfff599bc37a27450a858612763.gif');
  background-repeat: repeat;
  color: #fff;
  position: relative;
  z-index: 0;
}

.overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.151);
  z-index: -1;
}


header {
  background-color: #33333300;
  overflow: hidden;
  display: flex;
  justify-content: center;
  align-items: center;
}

header ul {
  list-style-type: none;
  margin: 0;
  padding: 0;
  overflow: hidden;
  display: flex;
}

header li {
  margin: 0 15px;
  display: flex;
  align-items: center;
}
header a, .login-register-btn button, .category {
  transition: color 0.3s ease-in-out, background-color 0.3s ease-in-out;
}

header a {
  color: #bb7ff3ee;
  text-decoration: none;
  transition: color 0.3s ease-in-out;
  /* Agregamos una transición al color de los enlaces */
}

header a:hover {
  color: #C9F0FD;
}

.login-register-btn button {
  background: linear-gradient(90deg, #8e44ad, #3498db, #ffffff, #3498db, #8e44ad);
  background-size: 1200% 100%;
  /* Ajusta el tamaño del gradiente */
  background-repeat: repeat;
  /* Evita que se repita el gradiente */
  border: none;
  display: inline-block;
  padding: 10px 15px;
  cursor: pointer;
  font-size: 24px;
  color: transparent;
  background-clip: text;
  -webkit-background-clip: text;
  animation: gradient 5s infinite linear;
  transition: color 0.3s ease-in-out;
  margin-right: 10px;
  /* Agrega espacio entre los botones */
}

.login-register-btn button:hover {
  color: #fff;
}

.login-register-btn {
  display: flex;
  gap: 10px;
  margin-left: auto;
  /* This pushes the buttons to the right */
}

.login-register-btn .register-btn {
  margin-right: 0;
  /* Elimina el espacio derecho para el último botón */
}

/* Estilos para el enlace del router-link */
.routerlink {
  text-decoration: none;
  color: inherit;
  /* hereda el color del texto del padre */
}

.routerlink:hover {
  color: #C9F0FD;
  /* Cambia el color al pasar el ratón sobre los enlaces */
}

.container {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  align-items: center;
  max-width: 1700px;
  margin: 0 auto;
  z-index: 1;
}
.category {
  width: calc(30% - 20px);
  margin: 10px;
  overflow: hidden;
  position: relative;
  z-index: 1;
  border: 3px solid #3498db;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
  transition: transform 0.3s ease-in-out;
  box-sizing: border-box;
  border: 3px solid #e2b8f3;
}


.login-register-btn:hover {
  color: #fff;
}

@keyframes gradient {
  0% {
    background-position: 0% 50%;
  }

  100% {
    background-position: 100% 50%;
  }
}


/* Existing styles above */

@media only screen and (max-width: 600px) {
  body, html {
    overflow-y: auto; /* Añadir overflow-y a body y html solo en pantallas más pequeñas */
  }
  header {
    background-color: #33333300;
    overflow: hidden;
    padding: 20px;
    display: flex;
    justify-content: center; /* Centrar elementos horizontalmente */
    align-items: center; /* Centrar elementos verticalmente */
  }

  .login-register-btn {
    display: flex;
    align-items: center;
    gap: 8px;
    margin-top: 10px;
    margin-left: 10px;
    margin-right: 10px;
  }

  .login-register-btn button {
    width: 100%;
  }

  .container {
    max-height: 100vh;
    overflow-y: auto;
    max-width: 40%;
  }

  .category {
    width: calc(50% - 20px);
    margin-right: 40px 0;
    margin-bottom: 50px;
  }
  .category img {
    width: 100%;
    height: 150px;
    object-fit: cover;
    border-radius: 5px 5px 0 0;
  }

  .category-content {
    padding: 15px;
    text-align: center; /* Centrar el texto dentro de las tarjetas */
  }

  .category h2 {
    color: #af6dec;
    margin-bottom: 10px;
    font-size: 1.5em;
    text-align: center; /* Centrar el texto dentro de las tarjetas */
  }

  .category p {
    font-size: 16px;
    line-height: 1.4;
    color: #A9A9A9;
    text-align: center; /* Centrar el texto dentro de las tarjetas */
  }
}
@media only screen and (max-width: 400px) {
  .category {
    width: calc(100% - 20px); /* Una tarjeta por fila en pantallas más pequeñas */
    margin:20px;
  }
}


@media only screen and (min-width: 601px) and (max-width: 1024px) {
  .category {
    width: 48%;
    margin: 10px 1%;
  }
}

.container {
  position: relative;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  max-width: 1500px;
  margin: 0 auto;
  z-index: 1;
}

h1 {
  color: #ae00ff;
  font-size: 2.5em;
  margin-bottom: 20px;
  width: 100%;
  text-align: center;
}

.category:hover {
  transform: scale(1.05);
  box-shadow: 0 0 15px rgba(234, 0, 255, 0.6);
}

.category img {
  width: 100%;
  height: 150px;
  object-fit: cover;
  border-radius: 5px 5px 0 0;
}

.category-content {
  padding: 15px;
}

.category h2 {
  color: #af6dec;
  margin-bottom: 10px;
  font-size: 1.5em;
}

.category p {
  font-size: 16px;
  line-height: 1.4;
  color: #A9A9A9;
}
</style>