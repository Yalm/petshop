<?php

use Illuminate\Database\Seeder;
use App\Category;

class CategoryTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        if (env('APP_DEBUG')) {
            Category::create(['name' => 'Productos']);
            Category::create(['name' => 'Alimentos']);

            Category::create(['name' => 'Ropa y complementos', 'parent_id' => 1]);
            Category::create(['name' => 'Juguetes', 'parent_id' => 1]);
            Category::create(['name' => 'Comedores y bebederos', 'parent_id' => 1]);

            Category::create(['name' => 'Gatos', 'parent_id' => 2]);
            Category::create(['name' => 'Perros', 'parent_id' => 2]);
            Category::create(['name' => 'Premios y bocadillos', 'parent_id' => 2]);
        }
    }
}
