<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use DB;

class OrderDetail extends Model
{
    protected $guarded = [];

    public function product()
    {
        return $this->belongsTo(Category::class);
    }

    public function order()
    {
        return $this->belongsTo(Customer::class);
    }

    public function scopeDate($query, array $s)
    {
        if ($s && count($s) > 0) {
            return $query->whereBetween('orders.created_at', $s);
        }
    }

    public static function topProduct()
    {
        return OrderDetail::join('products', 'order_details.product_id', '=', 'products.id')
            ->join('orders', 'order_details.order_id', '=', 'orders.id')
            ->select('products.id', 'products.name', DB::raw('sum(quantity) as quantity'))
            ->where('orders.state_id', '=', '2')
            ->groupBy('products.id', 'products.name')
            ->orderBy(DB::raw('sum(quantity)'), 'desc');
    }
}
