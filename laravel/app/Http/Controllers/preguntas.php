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
    public function index()
    {
        $preguntas = preguntasModel::all();
        return view('index', compact('preguntas'));
    }
    
    public function create()
    {
        $categorias = CategoriaModel::all();
        return view('create', compact('categorias'));
    }

   // app/Http/Controllers/PreguntasController.php
   public function store(Request $request)
   {
       $request->validate([
           'pregunta' => 'required',
           'opciones' => 'required|json',
           'respuesta_correcta' => 'required',
           'categoria_id' => 'required|exists:categoria,id',
       ]);
   
       try {
           $pregunta = preguntasModel::create($request->all());
   
           // Redirigir a la vista de detalles de la pregunta recién creada
           return redirect()->route('preguntas.show', $pregunta->id)->with('success', 'Pregunta creada exitosamente.');
       } catch (\Exception $e) {
           // Redirigir de nuevo a la vista de creación con un mensaje de error
           return redirect()->route('preguntas.create')->with('error', 'Error al crear la pregunta: ' . $e->getMessage())->withInput();
       }
   }
   

   public function showStoreView()
   {
       return View::make('preguntas.store');
   }
   
   public function show(preguntasModel $pregunta)
   {
       // Lógica para mostrar una pregunta específica
       return view('show', compact('pregunta'));
   }

    public function edit(preguntasModel $pregunta)
    {
        $categorias = CategoriaModel::all();
        return view('edit', compact('pregunta', 'categorias'));
    }

   
    
    public function update(Request $request, preguntasModel $pregunta)
    {
        $request->validate([
            'pregunta' => 'required',
            'opciones' => 'required',
            'respuesta_correcta' => 'required',
            'categoria_id' => 'required|exists:categoria,id',
        ]);
    
        $pregunta->update($request->all());
    
        return redirect()->route('preguntas.index')
            ->with('success', 'Pregunta actualizada exitosamente.');
    }
    
    public function destroy(preguntasModel $pregunta)
    {
        $pregunta->delete();
    
        return redirect()->route('preguntas.index')
            ->with('success', 'Pregunta eliminada exitosamente.');
    }

}
