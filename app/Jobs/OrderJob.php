<?php

namespace App\Jobs;

use Culqi\Culqi;
use App\Order;
use App\Product;
use App\Payment;

class OrderJob extends Job
{
    protected $data;
    protected $plus_info;
    /**
     * Create a new job instance.
     *
     * @return void
     */
    public function __construct(Array $data)
    {
        $this->data = $data;
        if (array_key_exists('plus_info', $this->data)) {
            $this->plus_info = $this->data['plus_info'];
        }
    }
    /**
     * Execute the job.
     *
     * @return void
     */
    public function handle()
    {
        $culqi = new Culqi(array('api_key' => env('CULQUI_SECRET_KEY')));
        $items = $this->getProducts();
        try {
            $culqiSuccess = $culqi->Charges->create(
                array(
                    'amount' => round(($items->total * 100), 2),
                    'capture' => true,
                    'currency_code' => 'PEN',
                    'description' => 'Ventas en línea petShop',
                    'email' => $this->data['email'],
                    'installments' => 0,
                    'source_id' => $this->data['culqi_token']
                )
            );
        } catch (\Exception $e) {
            Order::create([
                'state_id' => 5,
                'customer_id' => $this->data['customer_id'],
                'plus_info' => $e->getMessage()
            ]);
            return;
        }

        $order = Order::create([
            'customer_id' => $this->data['customer_id'],
            'plus_info' => $this->plus_info,
            'state_id' => 4
        ]);

        Payment::create([
            'order_id' => $order->id,
            'amount' => $items->total,
            'reference_code' => $culqiSuccess->reference_code,
            'payment_type_id' => 1,
        ]);

        foreach ($items as $product) {
            $product->decrement('stock', $product->quantity);
            $order->products()->attach($product->id, ['quantity' => $product->quantity]);
        }
    }

    protected function getProducts()
    {
        $ids = array_map(
            function ($item) {
                return $item['id'];
            },
            $this->data['items']
        );
        $products = Product::findMany($ids);
        $total = 0;

        foreach ($products as $product) {
            $key = array_search($product->id, array_column($this->data['items'], 'id'));
            $product->quantity = $this->data['items'][$key]['quantity'];
            $total += $product->price * $product->quantity;
        }
        $products->total = $total;

        return $products;
    }
}
