<?php

use Illuminate\Database\Seeder;
use App\State;

class StateTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        State::create([
            'name' => 'cancelado'
        ]);

        State::create([
            'name' => 'completado'
        ]);

        State::create([
            'name' => 'pendiente de pago'
        ]);

        State::create([
            'name' => 'pendiente de revisión'
        ]);

        State::create([
            'name' => 'fallido'
        ]);

        State::create([
            'name' => 'enviado'
        ]);
    }
}
