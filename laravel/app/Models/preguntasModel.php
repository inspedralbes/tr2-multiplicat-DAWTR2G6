<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class preguntasModel extends Model
{
    use HasFactory;

    protected $table = 'preguntas';
    protected $fillable = ["pregunta","opciones","respuesta_correcta","categoria_id",];

    protected static $factory = PreguntasFactory::class;
}
