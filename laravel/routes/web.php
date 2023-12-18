<?php

use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "web" middleware group. Make something great!
|
*/
use App\Http\Controllers\preguntas;

// List all questions
Route::get('/preguntas', [preguntas::class, 'index'])->name('preguntas.index');

// Show the form to create a new question
Route::get('/preguntas/create', [preguntas::class, 'create'])->name('preguntas.create');

// Store a new question
Route::post('/preguntas', [preguntas::class, 'store'])->name('preguntas.store');

// Show a specific question
Route::get('/preguntas/{pregunta}', [preguntas::class, 'show'])->name('preguntas.show');

// Show the form to edit a question
Route::get('/preguntas/{pregunta}/edit', [preguntas::class, 'edit'])->name('preguntas.edit');

// Update a specific question
Route::put('/preguntas/{pregunta}', [preguntas::class, 'update'])->name('preguntas.update');

// Delete a specific question
Route::delete('/preguntas/{pregunta}', [preguntas::class, 'destroy'])->name('preguntas.destroy');


Route::get('/', function () {
    return view('welcome');
});
