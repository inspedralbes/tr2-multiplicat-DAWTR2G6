import express from 'express';
import { createServer } from 'http';
import { Server } from 'socket.io';
import cors from 'cors';

const app = express();

// Explicitly set up CORS to allow requests from the client application.
app.use(cors({
    origin: '*',
    methods: ['GET', 'POST'],
    credentials: true,
}));

const server = createServer(app);
const io = new Server(server);


// LISTA DE JUGADORES
const players = {};
const playersCount = 0;
// LISTA DE PUNTOS A QUITARSE, QUANTOS MENOS MEJOR
const initialBlocks = 10;


// MIN NUM DE JUGADORES PARA CHECKMULTIPLAYER DEVUELVA begin-MULT-gameMode
const minPlayersForMultiplayer = 2;

// QUANDO ALGUIEN SE UNE . . .
io.on('connection', (socket) => {
    // MENSAJE POR CONSOLA
    console.log('Nuevo jugador conectado');
    // NUEVO JUGADOR -> ASIGNAR NUMERO DE BLOCKS
    players[socket.id] = {
        blocks: initialBlocks
    };

    // NOTIFICAR A CADA JUGADOR SOBRE ESTA NUEVA CONEXION
    io.emit('updatePlayers', Object.keys(players));

    // SOCKET RECIBE socket.emit('begin-SP-gameMode')
    socket.on('begin-SP-gameMode', (data) => {
        // EMPEZAR SP gameMode
        if (data === 'singlePlayer'){
            console.log('hola hola hola hola caracola caracola caracola caracola');
        }    

    });
     
     socket.on('begin-MULT-gameMode', (data) => {
        // EMPEZAR MULT gameMode
        if (data === 'multiPlayer'){
            console.log('ADIOS ADIOS ADIOS ADIOS');
        }    

    });

    // SOCKET RECIBE socket.emit('check-if-mult-isPlayable')
    socket.on('check-if-mult-isPlayable', (data) => {
        // COMPROBAR QUE HAY SUFICIENTES JUGADORES CONECTADOS
        if (data === 'multPlayer'){
            playersCount += 1;
            console.log('hola hola hola hola caracola caracola caracola caracola');
            checkMultiplayer(data);
        }   
       
    });



    // SOCKET RECIBE socket.emit('answerQuestion')
    socket.on('answerQuestion', (isCorrect) => {
        if (isCorrect) {
            // RESPUESTA CORRECTA, REDUCIR NUMERO DE BLOQUES
            players[socket.id].blocks -= 1;
            if (players[socket.id].blocks === 0) {
                socket.emit('end-game--playerVictory');
                console.log(players[socket.id] + 'ha guanyat la partida!');
            }
        } else {
            // RESPUESTA INCORRECTA, AUGMENTAR NUMERO DE BLOQUES
            players[socket.id].blocks += 1;
        }
    });

    // SE PIERDE UNA CONEXION
    socket.on('disconnect', () => {
        // REDUCIR PLAYER COUNT
        playersCount -= 1;

        delete players[socket.id];
        // UPDATEAR A LOS JUGADORES SOBRE LOS VACANTES
        io.emit('updatePlayers', Object.keys(players));
        // SE PUEDE JUGAR ?
        // checkMultiplayer();
    });

    // SUFICIENTES JUGADORES PARA UNA PARTIDA MULTIJUGADOR ?
    const checkMultiplayer = (data) => {
        if ((data === 2 && Object.keys(players).length >= minPlayersForMultiplayer)) {
            // EMPIEZA LA PARTIDA MULTIJUGADOR
            playersCount += Object.keys(players).length;
            io.emit('begin-MULT-gameMode');
        } else {
            console.log('Se requiren mas jugadores para una partida multijugador');
        }
    };

});

//  CONF DEL SV
const PORT = process.env.PORT || 3333;
server.listen(PORT, () => {
    console.log(`Servidor escuchando en el puerto ${PORT}`);
});