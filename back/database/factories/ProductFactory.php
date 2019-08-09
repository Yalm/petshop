<?php

use Faker\Generator as Faker;

$factory->define(App\Product::class, function (Faker $faker) {
    $name = $faker->unique()->realText(100);
    return [
        'name' => $name,
        'price' => $faker->randomFloat(2, 2, 1000.00),
        'cover' => $faker->imageUrl(1200, 1200),
        'stock' => rand(1, 20),
        'description' => $faker->text(900),
        'short_description' => $faker->text(350),
        'url' => str_slug($name),
        'category_id' => rand(3, 8),
        'color_id' => rand(1, 100),
        'created_at' => $faker->dateTimeThisDecade,
        'updated_at' => $faker->dateTimeThisDecade,
    ];
});
