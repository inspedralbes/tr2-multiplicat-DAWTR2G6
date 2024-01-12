<!-- resources/views/preguntas/edit.blade.php -->

@extends('layouts.app')

@section('content')
    <div class="container mt-5">
        <h1 style="color: #3498db;">Editar preguntas</h1>

        <form action="{{ route('preguntas.update', $pregunta->id) }}" method="POST">
            @csrf
            @method('PUT')

            <div style="margin-bottom: 20px;">
                <label style="display: block; color: #2ecc71; font-size: 18px;" for="pregunta">Pregunta:</label>
                <input type="text" name="pregunta" style="width: 100%; padding: 10px;" value="{{ $pregunta->pregunta }}" required>
            </div>

            <div style="margin-bottom: 20px;">
                <label style="display: block; color: #2ecc71; font-size: 18px;" for="opciones">Opciones (JSON Format):</label>
                <textarea name="opciones" style="width: 100%; padding: 10px;" required>{{ $pregunta->opciones }}</textarea>
            </div>

            <div style="margin-bottom: 20px;">
                <label style="display: block; color: #2ecc71; font-size: 18px;" for="respuesta_correcta">Respuesta Correcta:</label>
                <input type="text" name="respuesta_correcta" style="width: 100%; padding: 10px;" value="{{ $pregunta->respuesta_correcta }}" required>
            </div>

            <div style="margin-bottom: 20px;">
                <label style="display: block; color: #2ecc71; font-size: 18px;" for="categoria_id">Categoría ID:</label>
                <input type="text" name="categoria_id" style="width: 100%; padding: 10px;" value="{{ $pregunta->categoria_id }}" required>
            </div>

            <button type="submit" style="background-color: #e74c3c; color: #fff; padding: 10px; border: none; cursor: pointer;">Actualizar</button>
        </form>
    </div>
@endsection
