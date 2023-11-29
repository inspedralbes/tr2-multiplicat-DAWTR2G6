<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\preguntas;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class preguntasController extends Controller
{
    //

    public function enviarPreguntasUnidades()
    {

        $preguntas_unidades = preguntas::all();

        return response()->json($preguntas_unidades, JSON_PRETTY_PRINT);
    }

    public function recibirPreguntasUnidades(Request $request)
    {
        $preguntasData = $request->input('preguntas_unidades');

        foreach ($preguntasData as $preguntaData) {
            preguntas::create([
                'id' => $preguntaData['id'],
                'enunciat' => $preguntaData['pregunta'],
                'opciones' => json_encode($preguntaData['opciones']),
                'respuesta_correcta' => $preguntaData['respuesta_correcta'],
                'categoria_id' => $preguntaData['categoria_id'],
            ]);
        }

        return response()->json(['message' => 'OK'], 200);
    }

    
}
