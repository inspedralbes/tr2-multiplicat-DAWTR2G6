<?php

use App\Http\Controllers\preguntas;
use App\Http\Controllers\userController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

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

Route::post('register', [UserController::class, 'register']);


Route::post('login', [UserController::class, 'login']);


Route::group(['middleware' => ["auth:sanctum"]], function () {

    Route::get('user-profile', [UserController::class, 'userProfile']);
    Route::get('logout', [UserController::class, 'logout']);
   
    
});


Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});


Route::get('recibir-preguntas-todas', [preguntas::class, 'recibir_preguntas_TODAS']);
Route::get('recibir-preguntas-porCategoriaID/{id}', [preguntas::class, 'recibir_preguntas_porCategoriaID']);
Route::get('recibir-preguntas-porCategoria/{id}', [preguntas::class, 'recibir_preguntas_porCategoria']);
