<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Product extends Model
{
    protected $guarded = [];

    public function category()
    {
        return $this->belongsTo(Category::class);
    }

    public function color()
    {
        return $this->belongsTo(Color::class);
    }

    public function scopePrice($query, $min_price, $max_price)
    {
        if ($min_price && $max_price && $min_price != 'undefined')
            return $query->where('price', '>=', $min_price)
                ->where('price', '<=', $max_price);
    }

    public function orders()
    {
        return $this->belongsToMany(Order::class, 'order_details');
    }

    public function scopeCategory($query, $s)
    {
        if ($s != 'false' && $s != 'null' && $s && $s != 'undefined')
            return $query->where('category_id', $s);
    }

    public function scopeSearch($query, $s)
    {
        if ($s != 'false' && $s != 'null' && $s != 'undefined' && $s)
            return $query->where('name', 'LIKE', "%$s%")
                ->orWhere('price', 'LIKE', "%$s%")
                ->orWhere('stock', 'LIKE', "%$s%");
    }
}
