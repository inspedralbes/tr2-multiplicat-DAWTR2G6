<?php

namespace App\Http\Controllers;

use App\Models\categoriaModel;
use Illuminate\Http\Request;
use App\Models\preguntasModel;


class preguntas extends Controller
{
    //

    public function recibir_preguntas_TODAS()
    {
        $preguntas["preguntas_unidades"] = preguntasModel::all();
        return response()->json($preguntas);
    }

    public function recibir_preguntas_porCategoriaID($categoriaId)
    {
        $preguntas["preguntas_unidades"]  = preguntasModel::where('categoria_id', $categoriaId)->get();
        return response()->json($preguntas);
    }

    public function recibir_preguntas_porCategoria($categoriaNombre)
    {
        // Buscar la categoría por nombre
        $categoria = categoriaModel::where('nombre_categoria', $categoriaNombre)->first();

        // Verificar si la categoría existe
        if ($categoria) {
            // Obtener las preguntas de esa categoría
            $preguntas["preguntas_unidades"] = preguntasModel::where('categoria_id', $categoria->id)->get();
            return response()->json($preguntas);
        } else {
            return response()->json(['message' => 'Categoría no encontrada'], 404);
        }
    }
}
