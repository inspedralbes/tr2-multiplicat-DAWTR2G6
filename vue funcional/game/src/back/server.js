import express from "express";
import { createServer } from "http";
import { Server } from "socket.io";
import cors from "cors";


const app = express();

const corsOptions = {
  origin: "*",
  methods: ["GET", "POST"],
  credentials: true,
};
app.use(cors(corsOptions));

const server = createServer(app);
const io = new Server(server, {
  cors: corsOptions,
});

// obj con room (id, wi32eq) i blocks: (valor inicial 5)
const todos_los_jugadores = {};
let cont_jugadors = 0;
const numBloques = 5;
const minJugsMult = 2;
const maxJugsMult = 4;
// obj con id, jugadores, en_progreso
let rooms = [];

io.on("connection", (socket) => {
  console.log('on conection console log');

  socket.on("comprobar_suficientes_jugadores", () => {
    cont_jugadors += 1;

    let room = rooms.find(
      (room) =>
        room.jugadores.length < 2 &&
        !room.en_progreso
    );
    if (!room) {
      room = { id: Math.random().toString(36).substring(7), jugadores: [], en_progreso: false };
      rooms.push(room);
      console.log(`Se ha creado la sala ${room.id}`);
    }

    room.jugadores.push(socket.id);
    socket.join(room.id);

    todos_los_jugadores[socket.id] = { room: room.id, blocks: numBloques };


    console.log(`Contador de jugadores de la sala ${room.id}: ${room.jugadores.length}`);
    console.log(`Jugador ${socket.id} se ha conectado a la sala ${room.id}`);


    setTimeout(() => {
      if (room.jugadores.length >= minJugsMult && room.jugadores.length <= maxJugsMult && !room.en_progreso) {
        console.log(`Empieza la partida multijugador, enviando señal a los jugadores de la sala ${room.id}`);

        io.to(room.id).emit("empezarJuego-mult");
        io.to(room.id).emit("establecerJugadores", room.jugadores);
        io.to(room.id).emit("array jugadors", room.jugadores);

        room.en_progreso = true;
      } else {
        console.log("Se requiren mas jugadores para una partida multijugador");
      }
    }, 1000);

  });

  socket.on('enviar_bloques', (sockedID) => {
    let room = rooms.find((room) => room.jugadores.includes(socket.id));
    if (room) {
      console.log(room.jugadores);
      console.log(room.id);


      todos_los_jugadores[sockedID].blocks -= 2;
      console.log(`Jugador ${sockedID} responde correctamente, numBlocks: ` + todos_los_jugadores[sockedID].blocks);
      for (let id in todos_los_jugadores) {
        if (todos_los_jugadores[id].room === room.id) {

          todos_los_jugadores[id].blocks += 1;

          console.log(`Se le pasa un bloque de ${sockedID} a ${id} tiene ahora: ${todos_los_jugadores[id].blocks} bloques`);
        }

      }
      console.log(`Jugador ${sockedID} actualización bloques, numBlocks: ` + todos_los_jugadores[sockedID].blocks);
      io.to(room.id).emit('updatear_bloques_cliente', todos_los_jugadores);

    } else {
      console.log('No se ha encontrado la sala');
    }
  });

  socket.on("solicitud_acabar_partida", () => {
    console.log('Estoy dentro de solicitud_acabar_partida');
    let room = rooms.find((room) => room.jugadores.includes(socket.id));
    if (room) {
      io.to(room.id).emit("guardar_datos_partida_multi");
    } else {
      console.log('No se ha encontrado la sala');
    }
  });

  socket.on("partida_acabada", () => {
    console.log('Estoy dentro de partida_acabada');
    let room = rooms.find((room) => room.jugadores.includes(socket.id));
    if (room) {
      console.log(`Redirigiendo a la sala ${room.id} a la pantalla de scores`);
      io.to(room.id).emit("mover_sala_a_scores", room.id);

      room.jugadores = room.jugadores.filter((player) => player.id !== socket.id);
      delete todos_los_jugadores[socket.id];
      cont_jugadors -= 1;
      delete rooms[socket.id];
      io.emit("update_llista_jugadors", room.jugadores.length);
      io.emit("updatejugadores", Object.keys(todos_los_jugadores));
    } else {
      console.log('No se ha encontrado la sala');
    }
  });


  socket.on("disconnect", () => {
    console.log(`El jugador ${socket.id} se ha desconectado`);

    const sala_del_jugadorDesconectado = rooms.find((room) =>
      room.jugadores.includes(socket.id)
    );

    if (sala_del_jugadorDesconectado) {
      sala_del_jugadorDesconectado.jugadores = sala_del_jugadorDesconectado.jugadores.filter(
        (player) => player !== socket.id
      );
    }

    delete todos_los_jugadores[socket.id];

    cont_jugadors -= 1;
  });
});

const PORT = process.env.PORT || 3333;
server.listen(PORT, () => {
  console.log(`Servidor escuchando en el puerto ${PORT}`);
});
