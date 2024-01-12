<!-- resources/views/preguntas/store.blade.php -->

@extends('layouts.app')

@section('content')
    <div class="container mt-5">
        <h1>Pregunta creada correctamente</h1>

        <p>Tu pregunta ha sido creada!</p>

        <a href="{{ route('preguntas.create') }}" class="btn btn-primary">Crea otra pregunta</a>
    </div>
@endsection
