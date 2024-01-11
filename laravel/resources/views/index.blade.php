<!-- resources/views/preguntas/index.blade.php -->
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bulma@0.9.2/css/bulma.min.css">

@extends('/layouts/app')

@section('content')
    <div class="container mt-5">
        <h1 class="title is-1 mb-4">Preguntas</h1>

        <a href="{{ route('preguntas.create') }}" class="button is-success mb-3">Crea una nueva pregunta</a>

        <table class="table is-striped is-bordered is-fullwidth">
            <thead>
                <tr class="has-text-white">
                    <th>ID</th>
                    <th>Pregunta</th>
                    <th>Opciones</th>
                    <th>Respuesta Correcta</th>
                    <th>Categoria ID</th>
                    <th>Acciones</th>
                </tr>
            </thead>
            <tbody>
                @foreach ($preguntas as $pregunta)
                    <tr>
                        <td>{{ $pregunta->id }}</td>
                        <td>{{ $pregunta->pregunta }}</td>
                        <td>{{ $pregunta->opciones }}</td>
                        <td>{{ $pregunta->respuesta_correcta }}</td>
                        <td>{{ $pregunta->categoria_id }}</td>
                        <td>
                            <a href="{{ route('preguntas.edit', $pregunta->id) }}" class="button is-primary">Editar</a>

                            <form action="{{ route('preguntas.destroy', $pregunta->id) }}" method="POST" style="display: inline-block; margin-left: 5px;">
                                @csrf
                                @method('DELETE')

                                <button type="submit" class="button is-danger">Eliminar</button>
                            </form>
                        </td>
                    </tr>
                @endforeach
            </tbody>
        </table>
    </div>
@endsection
