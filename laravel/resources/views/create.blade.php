<!-- resources/views/preguntas/create.blade.php -->

@extends('layouts.app')

@section('content')
    <div class="container mt-5">
        <h1 style="color: #3498db;">Crear preguntas</h1>

        <form action="{{ route('preguntas.store') }}" method="POST">
            @csrf

            <div style="margin-bottom: 20px;">
                <label style="display: block; color: #2ecc71; font-size: 18px;" for="pregunta">Pregunta:</label>
                <input type="text" name="pregunta" style="width: 100%; padding: 10px;" required>
            </div>

            <div style="margin-bottom: 20px;">
                <label style="display: block; color: #2ecc71; font-size: 18px;" for="opciones">Opciones (JSON Format):</label>
                <textarea name="opciones" style="width: 100%; padding: 10px;" placeholder='{"opcion1": "Respuesta 1", "opcion2": "Respuesta 2", "opcion3": "Respuesta 3", "opcion4": "Respuesta 4"}' required></textarea>
           <p >{"opcion1": "Respuesta 1", "opcion2": "Respuesta 2", "opcion3": "Respuesta 3", "opcion4": "Respuesta 4"}</p>
            </div>

            <div style="margin-bottom: 20px;">
                <label style="display: block; color: #2ecc71; font-size: 18px;" for="respuesta_correcta">Respuesta Correcta:</label>
                <input type="text" name="respuesta_correcta" style="width: 100%; padding: 10px;" required>
            </div>

            <div style="margin-bottom: 20px;">
                <label style="display: block; color: #2ecc71; font-size: 18px;" for="categoria_id">Categoría ID:</label>
                <input type="text" name="categoria_id" style="width: 100%; padding: 10px;" required>
            </div>

            <button type="submit" style="background-color: #e74c3c; color: #fff; padding: 10px; border: none; cursor: pointer;">Enviar</button>
        </form>
    </div>
@endsection
