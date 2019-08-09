<?php

use Faker\Generator as Faker;

/*
|--------------------------------------------------------------------------
| Model Factories
|--------------------------------------------------------------------------
|
| This directory should contain each of the model factory definitions for
| your application. Factories provide a convenient way to generate new
| model instances for testing / seeding your application's database.
|
*/

$factory->define(App\User::class, function (Faker $faker) {
    return [
        'name' => $faker->name,
        'surnames' => $faker->name,
        'email' => $faker->unique()->safeEmail,
        'avatar' => $faker->unique()->imageUrl(500, 500, 'people'),
        'password' => app('hash')->make('secret'), // secret
    ];
});
