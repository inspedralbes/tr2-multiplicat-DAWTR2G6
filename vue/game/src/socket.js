// socket.js

const express = require('express');
const http = require('http');
const socketIO = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketIO(server);

// Lista de jugadores
const players = {};

// Lista de bloques de Tetris iniciales para cada jugador
const initialBlocks = 10;

// igual a lo escogido en LobbyScreen
let gameMode = mode;

// Número mínimo de jugadores requeridos para iniciar el juego en modo multijugador
const minPlayersForMultiplayer = 2;

// Manejador de conexiones
io.on('connection', (socket) => {
  console.log('Nuevo jugador conectado');
  playersCount += 1;
  io.emit('playerJoined', playersCount);

  // Asignar bloques iniciales al jugador
  players[socket.id] = {
    blocks: initialBlocks
  };

  // Notificar a todos los jugadores sobre el nuevo jugador
  io.emit('updatePlayers', Object.keys(players));

  // Manejador de inicio de juego
  socket.on('startMultiplayerGame', () => {
    // Comprobar si el lobby puede pasar a jugar
    checkStartMultiplayerGame();
  });

  socket.on('startPlayingSinglePlayer', () => {
    // Comprobar si el lobby puede pasar a jugar
    checkStartMultiplayerGame();
  });



  // Manejador de respuestas a preguntas
  socket.on('answerQuestion', (isCorrect) => {
    if (isCorrect) {
      // Reducir bloques si la respuesta es correcta
      players[socket.id].blocks -= 1;

      // Notificar a todos los jugadores sobre la respuesta correcta
      io.emit('updateBlocks', {
        id: socket.id,
        blocks: players[socket.id].blocks
      });
    } else {
      // Aumentar bloques si la respuesta es incorrecta
      players[socket.id].blocks += 1;

      // Notificar a todos los jugadores sobre la respuesta incorrecta
      io.emit('updateBlocks', {
        id: socket.id,
        blocks: players[socket.id].blocks
      });
    }
  });

  // Manejador de desconexiones
  socket.on('disconnect', () => {
    // Eliminar al jugador desconectado de la lista
    playersCount -= 1;
    delete players[socket.id];

    // Notificar a todos los jugadores sobre la actualización de jugadores
    io.emit('updatePlayers', Object.keys(players));

    // Comprobar si el lobby puede pasar a jugar
    checkStartMultiplayerGame();
  });

  // Función para comprobar si el lobby puede pasar a jugar
  const checkStartMultiplayerGame = () => {
    if ((gameMode === 2 && Object.keys(players).length >= minPlayersForMultiplayer)) {
      // Notificar a todos los jugadores para comenzar el juego
      io.emit('startPlayingMultiplayer');
    } else {
      alert('Se requiere mas jugadores');
    }
  };

});

// Configuración del servidor
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Servidor escuchando en el puerto ${PORT}`);
});