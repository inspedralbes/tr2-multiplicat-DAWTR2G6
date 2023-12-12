<template>
  <div>
    <div class="overlay"></div>

    <header>
      <ul>
        <li><a href="#categoria-volumen">Volumen</a></li>
        <li><a href="#categoria-masa">Masa</a></li>
        <li><a href="#categoria-capacidad">Capacidad</a></li>
        <li><a href="#categoria-temps">Temps</a></li>
        <li><a href="#categoria-superficie">Superficie</a></li>
        <li><a href="#categoria-longitut">Longitut</a></li>
      </ul>
      <div class="login-register-btn">Login/Register</div>
    </header>

    <div class="container">
      <h1>Selecciona una Categoría</h1>

      <div v-for="(category, index) in categories" :key="index" class="category" @click="selectCategory(category.id)">
        <img :src="category.image" :alt="category.alt">
        <div class="category-content">
          <h2>{{ category.title }}</h2>
          <p>{{ category.description }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      categories: [
        {
          id: 'volumen',
          image: 'https://blog.nekomath.com/wp-content/uploads/2022/10/Imagen5.jpg',
          alt: 'Volumen matemático',
          title: 'Volum',
          description: 'Explora conceptos matemáticos relacionados con el volumen. Descubre fórmulas y propiedades fascinantes',
        },
        {
          id: 'masa',
          image: 'https://img.freepik.com/vector-gratis/simbolo-escalas-justicia-aislado-sobre-fondo-blanco_1308-116006.jpg',
          alt: 'Masa',
          title: 'Massa',
          description: 'Explora conceptos matemáticos relacionados con la masa. Descubre fórmulas y propiedades fascinantes',
        },
        {
          id: 'capacitat',
          image: 'https://agora.xtec.cat/escfrancescarenes/wp-content/uploads/usu674/2019/05/litre.gif',
          alt: 'Capacitat',
          title: 'Capacitat',
          description: 'Explora conceptos matemáticos relacionados con la capacidad. Descubre fórmulas y propiedades fascinantes',
        },

        {
          id: 'temps',
          image: 'https://img.ccma.cat/multimedia/jpg/5/6/1671801440765_670x378.jpg',
          alt: 'Temps',
          title: 'Temps',
          description: 'Explora conceptos matemáticos relacionados con el tiempo. Descubre fórmulas y propiedades fascinantes',
        },


        {
          id: 'superficie',
          image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQh2ZC1ZFY55XMZ1J2CLH77lADCAmT7Ag5z02Ag73h00P6hLlBZyzFKxB3Vh8k6gGmYyAw&usqp=CAU',
          alt: 'Superficie',
          title: 'Superficie',
          description: 'Explora conceptos matemáticos relacionados con la superficie. Descubre fórmulas y propiedades fascinantes',
        },


        {
          id: 'longitut',
          image: 'https://www.fagorprofessional.com/blog/wp-content/uploads/2014/05/12-unidades-medida.jpg',
          alt: 'Longitut',
          title: 'Longitut',
          description: 'Explora conceptos matemáticos relacionados con la longitud. Descubre fórmulas y propiedades fascinantes',
        },
      ],
    };
  },
  methods: {
    selectCategory(categoryId) {
      // Lógica para manejar la selección de categoría
      console.log('Selected category:', categoryId);
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
  color: #fff;
  overflow: hidden;
  position: relative;
}

.overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.8);
  z-index: -1;
}

header {
  background-color: #33333300;
  overflow: hidden;
  padding: 20px;
  /* Añadido padding */
  display: flex;
  justify-content: space-between;
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

header a {
  color: #bb7ff3ee;
  text-decoration: none;
  transition: color 0.3s ease-in-out;
  /* Agregamos una transición al color de los enlaces */
}

header a:hover {
  color: #C9F0FD;
}

.login-register-btn {
  background: none;
  border: none;
  display: inline-block;
  padding: 10px 0;
  cursor: pointer;
  font-size: 1.2em;
  background: linear-gradient(90deg, #3498db, #e74c3c, #f39c12, #2ecc71, #3498db);
  background-size: 500% 100%;
  color: transparent;
  background-clip: text;
  -webkit-background-clip: text;
  animation: gradient 5s infinite linear;
  transition: color 0.3s ease-in-out;
}
.container {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around; /* Para distribuir las tarjetas uniformemente */
  align-items: center; /* Para centrar verticalmente las tarjetas */
  max-width: 1500px;
  margin: 0 auto;
  z-index: 1;
}
.category {
  width: calc(30% - 20px);
  margin: 10px;
  overflow: hidden;
  position: relative;
  border: 3px solid #3498db;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
  transition: transform 0.3s ease-in-out;
  box-sizing: border-box;
  border: 3px solid #e2b8f3;
  flex: 0 0 calc(30% - 20px); /* Fuerza el ancho deseado y permite que se ajuste según el tamaño de la pantalla */
}


h1:hover {
  transform: scale(1.1);
}

.category:nth-child(3n) {
  margin-bottom: 20px;
  /* Add margin to every third card (starting from the first) */
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

@media only screen and (max-width: 600px) {
  header {
    padding: 10px 10px;
    /* Ajusta el relleno según tus necesidades */
    flex-direction: column;
    align-items: flex-start;
  }

  header ul {
    flex-direction: column;
    align-items: flex-start;
    width: 100%;
  }

  header li {
    margin: 10px 0;
    /* Ajusta el margen según tus necesidades */
  }

  .category {
    width: calc(100% - 20px);
  }



  .login-register-btn {
    order: -1;
    /* Mueve el botón Login/Register al inicio */
  }
}

@media only screen and (min-width: 601px) and (max-width: 1024px) {
  .category {
    width: 48%;
    /* O ajusta el ancho según tus necesidades */
    margin: 10px 1%;
    /* O ajusta el margen según tus necesidades */
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
  /* Cambiamos el color de la sombra al pasar el ratón sobre las tarjetas */
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
  /* Cambiamos el color del texto de las tarjetas */

}
</style>