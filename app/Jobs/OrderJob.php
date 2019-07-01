<?php

namespace App\Jobs;

use Culqi\Culqi;
use App\Order;
use App\Product;
use App\Payment;

class OrderJob extends Job
{
    protected $culqi_token;
    protected $items;
    protected $order;
    /**
     * Create a new job instance.
     *
     * @return void
     */
    public function __construct(Order $order, string $culqi_token, array $items)
    {
        $this->$culqi_token = $culqi_token;
        $this->$order = $order;
        $this->$items = $items;
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
                    'email' => $this->order->customer()->email,
                    'installments' => 0,
                    'source_id' => $this->culqi_token
                )
            );
        } catch (\Exception $e) {
            $this->order->update([
                'state_id' => 5
            ]);
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
        return $products;
    }
}
