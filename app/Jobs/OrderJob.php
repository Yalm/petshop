<?php

namespace App\Jobs;

use Culqi\Culqi;
use App\Order;
use App\Product;
use App\Payment;

class OrderJob extends Job
{
    protected $data;
    protected $customer;
    protected $plus_info;
    /**
     * Create a new job instance.
     *
     * @return void
     */
    public function __construct(array $data)
    {
        $this->data = $data;
        $this->customer = $data['customer'];
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

        if($this->data['method'] == 'credit_card') {
            $this->creditCard($culqi,$items);
        } else  {
            $this->bankDeposit($culqi,$items);
        }

    }

    protected function creditCard(Culqi $culqi,$items)
    {
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
            $log = json_decode($e->getMessage());

            $order = Order::create([
                'state_id' => 5,
                'customer_id' => $this->customer->id,
                'plus_info' => $this->plus_info,
                'error_log' => $log->user_message
            ]);
            foreach ($items as $product) {
                $order->products()->attach($product->id, ['quantity' => $product->quantity]);
            }

            Payment::create([
                'order_id' => $order->id,
                'amount' => 0.00,
                'reference_code' => 'SIN PAGAR',
                'payment_type_id' => 1
            ]);
            return;
        }

        $order = Order::create([
            'customer_id' => $this->customer->id,
            'plus_info' => $this->plus_info,
            'state_id' => 4
        ]);

        Payment::create([
            'order_id' => $order->id,
            'amount' => $items->total,
            'reference_code' => $culqiSuccess->reference_code,
            'payment_type_id' => 1
        ]);

        foreach ($items as $product) {
            $product->decrement('stock', $product->quantity);
            $order->products()->attach($product->id, ['quantity' => $product->quantity]);
        }

        $this->customer->sendOrderNotification($order,$this->data['method'],'');
    }

    protected function bankDeposit(Culqi $culqi,$items)
    {
        $order = Order::create([
            'customer_id' => $this->customer->id,
            'plus_info' => $this->plus_info,
            'state_id' => 3
        ]);

        try {
            $payment = $culqi->Orders->create(
                array(
                    'amount' => round(($items->total * 100), 2),
                    'currency_code' => 'PEN',
                    'description' => 'Ventas en línea petShop',
                    'order_number' => 'xd-'.$order->id,
                    'client_details' => array(
                        'first_name'=> $this->customer->name,
                        'last_name'=> $this->customer->surnames,
                        'email' => 'renzomanuelc@gmail.com',
                        'phone_number'=> $this->customer->phone
                    ),
                    'confirm' => true,
                    'expiration_date' => time() + 24*60*60,   // 1 dia
                )
            );
        } catch (\Exception $e) {
            $order->delete();
            return;
        }

        Payment::create([
            'order_id' => $order->id,
            'amount' => 0.00,
            'reference_code' => 'SIN PAGAR',
            'payment_type_id' => 2
        ]);

        foreach ($items as $product) {
            $order->products()->attach($product->id, ['quantity' => $product->quantity]);
        }

        $this->customer->sendOrderNotification($order,$this->data['method'],$payment->payment_code);
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
