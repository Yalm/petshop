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

$factory->define(App\Customer::class, function (Faker $faker) {
    $documentsId = array(1, 6, 7, 4);

    return [
        'name' => $faker->name,
        'surnames' => $faker->name,
        'email' => $faker->unique()->safeEmail,
        'avatar' => $faker->unique()->imageUrl(500, 500, 'people'),
        'email_verified_at' => $faker->dateTimeThisDecade,
        'password' => app('hash')->make('secret'), // secret
        'phone' => $faker->phoneNumber,
        'document_id' => $documentsId[rand(0, 3)],
        'document_number' => $faker->ean8,
        'created_at' => $faker->dateTimeThisDecade,
        'updated_at' => $faker->dateTimeThisDecade
    ];
});
