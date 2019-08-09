<?php

use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $this->call([
            CategoryTableSeeder::class,
            ColorTableSeeder::class,
            ProductTableSeeder::class,
            DocumentTableSeeder::class,
            StateTableSeeder::class,
            UserTableSeeder::class,
            PaymentTypeTableSeeder::class,
            CustomerTableSeeder::class,
            OrderTableSeeder::class
        ]);
    }
}
