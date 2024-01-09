<?php

namespace Database\Factories;


use App\Models\preguntasModel;
use Illuminate\Database\Eloquent\Factories\Factory;
/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Model>
 */
class PreguntasFactory extends Factory
{
    protected $model = preguntasModel::class;

    public function definition()
    {
        return [
            'pregunta' => $this->faker->sentence,
            'categoria_id' => 1, // Cambia esto según tus necesidades
            'opciones' => json_encode([$this->faker->word, $this->faker->word, $this->faker->word]),
            'respuesta_correcta' => $this->faker->word,
        ];
    }
}
