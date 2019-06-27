<?php

use Faker\Generator as Faker;

$factory->define(App\Color::class, function (Faker $faker) {
    return [
        'name' => $faker->unique()->colorName,
        'hex' => $faker->unique()->hexcolor,
    ];
});
