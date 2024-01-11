<!-- resources/views/preguntas/show.blade.php -->

@extends('layouts.app')

@section('content')
    <div class="container mt-5">
        <h1>Detalles de la pregunta</h1>

        <ul>
            <li><strong>ID:</strong> {{ $pregunta->id }}</li>
            <li><strong>Pregunta:</strong> {{ $pregunta->pregunta }}</li>
            <li><strong>Opciones:</strong> {{ $pregunta->opciones }}</li>
            <li><strong>Respuesta Correcta:</strong> {{ $pregunta->respuesta_correcta }}</li>
            <li><strong>Categoría ID:</strong> {{ $pregunta->categoria_id }}</li>
        </ul>

        <a href="{{ route('preguntas.index') }}" class="btn btn-secondary">Volver a las preguntas</a>
    </div>
@endsection
