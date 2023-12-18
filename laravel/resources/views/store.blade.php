<!-- resources/views/preguntas/store.blade.php -->

@extends('layouts.app')

@section('content')
    <div class="container mt-5">
        <h1>Question Created Successfully</h1>

        <p>Your question has been created successfully!</p>

        <a href="{{ route('preguntas.create') }}" class="btn btn-primary">Create Another Question</a>
    </div>
@endsection
