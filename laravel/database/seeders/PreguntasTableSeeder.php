<?php

namespace Database\Seeders;

use App\Models\preguntasModel;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Database\Factories\PreguntasFactory;

class PreguntasTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run()
    {
        preguntasModel::factory()->count(50)->create();
    }
}
