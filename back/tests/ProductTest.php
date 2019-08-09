<?php

use Illuminate\Support\Facades\Auth;

class ProductTest extends TestCase
{
    /**
     * A basic test example.
     *
     * @return void
     */

    public function testCreateProduct()
    {
        $user = factory('App\User')->create();

        $token = Auth::guard('user')->fromUser($user);

        $this->post('/api/products', [
            'name' => 'xdd',
            'price' => '10.50',
            'stock' => '5',
            'short_description' => 'sdasd',
            'category_id' => 1
        ], ['Authorization' => "Bearer $token"]);

        // dd(print_r($response->response->getContent()));

        $this->seeStatusCode(422);
        $user->delete();
    }
}
