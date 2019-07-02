<?php

namespace App\Jobs;

use Culqi\Culqi;
use App\Order;
use App\Product;
use App\Payment;

class OrderJob extends Job
{
    private $order;
    private $token;
    private $items;
    private $email;
    /**
     * Create a new job instance.
     *
     * @return void
     */
    public function __construct(Order $order, Array $data)
    {
        $this->order = $order;
        $this->token = $data['culqi_token'];
        $this->items = $data['items'];
        $this->email = $data['email'];
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
                    'email' => $this->email,
                    'installments' => 0,
                    'source_id' => $this->token
                )
            );
        } catch (\Exception $e) {
            $this->order->update([
                'state_id' => 5,
                'plus_info' => $e->getMessage()
            ]);
            return;
        }

        Payment::create([
            'order_id' => $this->order->id,
            'amount' => $items->total,
            'reference_code' => $culqiSuccess->reference_code,
            'payment_type_id' => 1,
        ]);

        foreach ($items as $product) {
            $product->decrement('stock', $product->quantity);
            $this->order->products()->attach($product->id, ['quantity' => $product->quantity]);
        }
    }

    protected function getProducts()
    {
        $ids = array_map(
            function ($item) {
                return $item['id'];
            },
            $this->items
        );
        $products = Product::findMany($ids);
        $total = 0;

        foreach ($products as $product) {
            $key = array_search($product->id, array_column($this->items, 'id'));
            $product->quantity = $this->items[$key]['quantity'];
            $total += $product->price * $product->quantity;
        }
        $products->total = $total;

        return $products;
    }
}
