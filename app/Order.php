<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use DB;

class Order extends Model
{
    protected $guarded = [];

    public function products()
    {
        return $this->belongsToMany(Product::class, 'order_details')->withTimestamps()->withPivot(['quantity']);
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

    public static function purchases($f1, $f2)
    {
        return Order::join('customers', 'orders.customer_id', '=', 'customers.id')
            ->join('payments', 'payments.order_id', '=', 'orders.id')
            ->join('states', 'states.id', '=', 'orders.state_id')
            ->join('payment_types', 'payments.payment_type_id', '=', 'payment_types.id')
            ->select(DB::raw("CONCAT(customers.name,customers.surnames) as customer"), 'orders.id', 'orders.created_at', 'payments.amount', 'payment_types.name as method', 'states.name as state')
            ->whereBetween('orders.created_at', [$f1,  $f2]);
    }

    public static function topCustomer($f1, $f2)
    {
        return DB::table('orders')
            ->join('customers', 'customers.id', '=', 'orders.customer_id')
            ->select('customers.name', 'customers.surnames', 'customers.phone', 'customers.email', DB::raw('count(customer_id) as purchases'))
            ->where('state_id', '=', '2')
            ->whereBetween('orders.created_at', [$f1,  $f2])
            ->groupBy('customer_id', 'customers.name', 'customers.surnames', 'customers.phone', 'customers.email')
            ->orderBy(DB::raw('count(customer_id)'), 'desc')
            ->take(10)
            ->get();
    }
}
