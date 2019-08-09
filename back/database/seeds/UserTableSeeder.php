<?php

use Illuminate\Database\Seeder;
use App\User;

class UserTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        User::create([
            'name' => 'Renzo',
            'surnames' => 'Manuel',
            'email' => 'renzomanuelc@gmail.com',
            'password' => app('hash')->make('secret')
        ]);
    }
}
