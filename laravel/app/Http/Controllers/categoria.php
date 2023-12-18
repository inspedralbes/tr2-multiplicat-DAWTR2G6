<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class categoria extends Controller
{
    //
    protected $table = 'categoria';
    protected $fillable = ['nombre_categoria'];
}
