<?php

use Illuminate\Database\Seeder;
use App\Document;

class DocumentTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        Document::create([
            'name' => 'DNI',
            'length' => '8'
        ]);

        Document::create([
            'id' => 6,
            'name' => 'RUC',
            'length' => '11'
        ]);

        Document::create([
            'id' => 7,
            'name' => 'PASAPORTE',
            'length' => '12'
        ]);

        Document::create([
            'id' => 4,
            'name' => '	CARNET EXT',
            'length' => '12'
        ]);
    }
}
