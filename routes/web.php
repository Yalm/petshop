<?php

/*
|--------------------------------------------------------------------------
| Application Routes
|--------------------------------------------------------------------------
|
| Here is where you can register all of the routes for an application.
| It is a breeze. Simply tell Lumen the URIs it should respond to
| and give it the Closure to call when that URI is requested.
|
*/
$router->get('/', function () use ($router) {
    return $router->app->version();
});

$router->group(['prefix' => 'api/auth/customer'], function () use ($router) {
    $router->post('{provider}/login', 'Auth\CustomerController@social');
    $router->post('login', 'Auth\CustomerController@login');
    $router->post('register', 'Auth\CustomerController@register');
    $router->get('logout', 'Auth\CustomerController@logout');
    $router->get('me', 'Auth\CustomerController@me');
    $router->get('refresh', 'Auth\CustomerController@refresh');

    $router->post('password/email', 'Auth\ForgotPasswordController@sendResetLinkEmail');
    $router->post('password/reset', 'Auth\ResetPasswordController@reset');
});

$router->group(['prefix' => 'api/auth/user'], function () use ($router) {
    $router->post('login', 'Auth\UserController@login');
    $router->post('{provider}/login', 'Auth\UserController@social');
    $router->get('logout', 'Auth\UserController@logout');
    $router->get('me', 'Auth\UserController@me');
    $router->get('refresh', 'Auth\UserController@refresh');
});

$router->group(['prefix' => 'api'], function () use ($router) {
    $router->get('categories', 'CategoryController@index');
    $router->get('colors', 'ColorController@index');
    $router->get('documents', 'DocumentController@index');
    $router->get('orders', 'OrderController@index');
    $router->get('orders/{id}', 'OrderController@show');
    $router->get('products', 'ProductController@index');
    $router->get('products/{url}', 'ProductController@show');
    $router->post('products', 'ProductController@store');
});
