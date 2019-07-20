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
    $router->get('categories/{id}', 'CategoryController@show');
    $router->post('categories', 'CategoryController@store');
    $router->put('categories/{id}', 'CategoryController@update');
    $router->delete('categories/{id}', 'CategoryController@destroy');

    $router->get('colors', 'ColorController@index');
    $router->post('colors', 'ColorController@store');
    $router->put('colors/{id}', 'ColorController@update');
    $router->delete('colors/{id}', 'ColorController@destroy');

    $router->get('customers', 'CustomerController@index');
    $router->get('customers/{id}', 'CustomerController@show');
    $router->put('customers/{id}', 'CustomerController@update');
    $router->delete('customers/{id}', 'CustomerController@destroy');
    $router->get('customers/count', 'CustomerController@count');

    $router->get('documents', 'DocumentController@index');

    $router->get('orders', 'OrderController@index');
    $router->post('orders', 'OrderController@store');
    $router->get('orders/{id}', 'OrderController@show');
    $router->put('orders/{id}', 'OrderController@update');
    $router->get('orders/count', 'OrderController@count');

    $router->get('users', 'UserController@index');
    $router->get('users/{id}', 'UserController@show');
    $router->post('users', 'UserController@store');
    $router->put('users/{id}', 'UserController@update');
    $router->delete('users/{id}', 'UserController@destroy');

    $router->get('products', 'ProductController@index');
    $router->get('products/{url}', 'ProductController@show');
    $router->put('products/{id}', 'ProductController@update');
    $router->post('products', 'ProductController@store');
    $router->delete('products/{id}', 'ProductController@destroy');
    $router->get('products/count', 'ProductController@count');
});
