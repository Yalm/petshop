<?php

use Faker\Generator as Faker;

$factory->define(App\Payment::class, function (Faker $faker) {
    return [
        'amount' => $faker->randomFloat(2,2,1000.00),
        'reference_code' => $faker->swiftBicNumber,
        'payment_type_id' => 1,
    ];
});
