<?php

use Illuminate\Database\Seeder;
use App\Customer;

class CustomerTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        if (env('APP_DEBUG')) {
            Customer::create([
                'name' => 'Renzo',
                'surnames' => 'Manuel',
                'email' => 'i1620547@continental.edu.pe',
                'email_verified_at' => '2019-06-22 06:49:10',
                'password' => app('hash')->make('secret'),
                'actived' => true,
                'document_id' => 1,
                'document_number' => '74998182',
                'phone' => '924951173'
            ]);

            factory(App\Customer::class, 800)->create();
        }
    }
}
