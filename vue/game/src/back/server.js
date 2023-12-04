import express from "express";
import { createServer } from "http";
import { Server } from "socket.io";
import cors from "cors";

const app = express();

//Permite enviar solicitudes cors, de ese puerto
const corsOptions = {
  origin: "http://localhost:5173",
  methods: ["GET", "POST"],
  credentials: true,
};
app.use(cors(corsOptions));

const server = createServer(app);
const io = new Server(server, {
  cors: corsOptions,
});

// LISTA DE JUGADORES
const arr_jugadors = {};
//Contador de jugadores
let cont_jugadors = 0;
// LISTA DE PUNTOS A QUITARSE, QUANTOS MENOS MEJOR
const numBloques = 5;

// MIN NUM DE JUGADORES PARA CHECKMULTIPLAYER DEVUELVA empezarJuego-mult
const minJugsMult = 2;

// QUANDO ALGUIEN SE UNE . . .
io.on("connection", (socket) => {



  cont_jugadors++;
  io.emit("update_llista_jugadors", cont_jugadors);



  socket.on("empezarJuego-mult", () => {
    // EMPEZAR MULT gameMode
    io.emit("redirectPantallaJuego", cont_jugadors);
  });

  // SOCKET RECIBE socket.emit('check-mult-jugable')
  socket.on("check-mult-jugable", () => {
    // MENSAJE POR CONSOLA
    console.log("Jugadors antes ", arr_jugadors);
    // NUEVO JUGADOR -> ASIGNAR NUMERO DE BLOCKS
    arr_jugadors[socket.id] = {
      blocks: numBloques,
    };
    console.log("Jugadors despues", arr_jugadors);

    // NOTIFICAR A CADA JUGADOR SOBRE ESTA NUEVA CONEXION
    io.emit("updatePlayers", Object.keys(arr_jugadors));

    // COMPROBAR QUE HAY SUFICIENTES JUGADORES CONECTADOS
    cont_jugadors += 1;
    console.log("somos " + cont_jugadors);
    if (cont_jugadors >= minJugsMult) {
      // EMPIEZA LA PARTIDA MULTIJUGADOR
      //          cont_jugadors += Object.keys(arr_jugadors).length;
      console.log("A JUGAR YA!!");
      io.emit("empezarJuego-mult");
    } else {
      console.log("Se requiren mas jugadores para una partida multijugador");
    }
  });


  /*
  // SOCKET RECIBE socket.emit('answerQuestion')
  socket.on("answerQuestion", (isCorrect) => {
    if (isCorrect) {
      // RESPUESTA CORRECTA, REDUCIR NUMERO DE BLOQUES
      arr_jugadors[socket.id].blocks -= 1;
      if (arr_jugadors[socket.id].blocks === 0) {
        socket.emit("end-game--playerVictory");
        console.log(arr_jugadors[socket.id] + "ha guanyat la partida!");
      }
    } else {
      // RESPUESTA INCORRECTA, AUGMENTAR NUMERO DE BLOQUES
      arr_jugadors[socket.id].blocks += 1;
    }
  });
*/

  // SE PIERDE UNA CONEXION
  socket.on("disconnect", () => {
    delete arr_jugadors[socket.id];
    // UPDATEAR A LOS JUGADORES SOBRE LOS VACANTES
    io.emit("updatePlayers", Object.keys(arr_jugadors));
  });
});

//  CONF DEL SV
const PORT = process.env.PORT || 3333;
server.listen(PORT, () => {
  console.log(`Servidor escuchando en el puerto ${PORT}`);
});
