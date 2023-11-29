<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\preguntasController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});



// rutas para pillar del front json de preguntas sobre sistema universal de medidas
Route::get('/enviar-preguntas-unidades', [preguntasController::class, 'enviarPreguntasUnidades']);
Route::post('/recibir-preguntas-unidades', [preguntasController::class, 'recibirPreguntasUnidades']);
// NO HECHAS NO HECHAS NO HECHAS NO HECHAS NO HECHAS NO HECHAS NO HECHAS NO HECHAS NO HECHAS NO HECHAS NO HECHAS
Route::get('/enviar-preguntas-unidades-massa', [preguntasController::class, 'enviarPreguntasUnidades_massa']);
Route::get('/enviar-preguntas-unidades-longitud', [preguntasController::class, 'enviarPreguntasUnidades_longitud']);
Route::get('/enviar-preguntas-unidades-capacitat', [preguntasController::class, 'enviarPreguntasUnidades_capacitat']);
Route::get('/enviar-preguntas-unidades-superficie', [preguntasController::class, 'enviarPreguntasUnidades_superficie']);
Route::get('/enviar-preguntas-unidades-volum', [preguntasController::class, 'enviarPreguntasUnidades_volum']);
Route::get('/enviar-preguntas-unidades-temps', [preguntasController::class, 'enviarPreguntasUnidades_temps']);

// rutas para pillar del front json de preguntas sobre conversion de datos
// NO HECHAS NO HECHAS NO HECHAS NO HECHAS NO HECHAS NO HECHAS NO HECHAS NO HECHAS NO HECHAS NO HECHAS NO HECHAS
Route::get('/enviar-preguntas-conversion', [preguntasController::class, 'enviarPreguntasConversion']);
Route::get('/enviar-preguntas-conversion-massa', [preguntasController::class, 'enviarPreguntasConversion_massa']);
Route::get('/enviar-preguntas-conversion-superficie', [preguntasController::class, 'enviarPreguntasConversion_superficie']);
Route::get('/enviar-preguntas-conversion-capacitat', [preguntasController::class, 'enviarPreguntasConversion_capacitat']);
Route::get('/enviar-preguntas-conversion-temps', [preguntasController::class, 'enviarPreguntasConversion_temps']);