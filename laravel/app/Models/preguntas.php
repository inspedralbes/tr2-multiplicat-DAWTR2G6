<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class preguntas extends Model
{
    use HasFactory;

    protected $table = "preguntas";
    protected $fillable = [
        "enunciat",
        "categoria_id",
        "opciones",
        "respuesta_correcta",
    ];
}
