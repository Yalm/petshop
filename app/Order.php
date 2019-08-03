<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use DB;

class Order extends Model
{
    protected $guarded = [];

    public function products()
    {
        return $this->belongsToMany(Product::class, 'order_details')->withPivot('quantity');
    }

    public function customer()
    {
        return $this->belongsTo(Customer::class);
    }

    public function state()
    {
        return $this->belongsTo(State::class);
    }

    public function payment()
    {
        return $this->hasOne(Payment::class);
    }


    public function scopeSearch($query, $s)
    {
        if ($s != 'false' && $s != 'null' && $s)
            return $query->where('id', 'LIKE', "%$s%")
                ->orWhere('created_at', 'LIKE', "%$s%")
                ->orWhereHas('customer', function ($q) use ($s) {
                    $q->where('name', 'like', "%$s%");
                })
                ->orWhereHas('state', function ($q) use ($s) {
                    $q->where('name', 'like', "%$s%");
                })
                ->orWhereHas('payment', function ($q) use ($s) {
                    $q->where('amount', 'like', "%$s%");
                });
    }

    public static function purchases()
    {
        return Order::join('customers', 'orders.customer_id', '=', 'customers.id')
            ->join('payments', 'payments.order_id', '=', 'orders.id')
            ->join('states', 'states.id', '=', 'orders.state_id')
            ->join('payment_types', 'payments.payment_type_id', '=', 'payment_types.id')
            ->select(DB::raw("CONCAT(customers.name,customers.surnames) as customer"), 'orders.id', 'orders.created_at', 'payments.amount', 'payment_types.name as method', 'states.name as state');
    }

    public static function topCustomer()
    {
        return Order::join('customers', 'customers.id', '=', 'orders.customer_id')
            ->select('customers.name', 'customers.surnames', 'customers.phone', 'customers.email', DB::raw('count(customer_id) as purchases'))
            ->where('state_id', '=', '2')
            ->groupBy('customer_id', 'customers.name', 'customers.surnames', 'customers.phone', 'customers.email')
            ->orderBy(DB::raw('count(customer_id)'), 'desc');
    }

    public static function topProduct()
    {
        return DB::table('order_details')
            ->join('products', 'order_details.product_id', '=', 'products.id')
            ->join('orders', 'order_details.order_id', '=', 'orders.id')
            ->select('products.id', 'products.name', DB::raw('sum(quantity) as TotalQuantity'))
            ->where('orders.state_id', '=', '2')
            ->groupBy('products.id', 'products.name')
            ->orderBy(DB::raw('sum(quantity)'), 'desc');
    }
}
