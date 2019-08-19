<?php

namespace App;

use App\Scopes\ActiveScope;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Storage;

class Product extends Model
{
    protected $guarded =[];
    protected $hidden = [
        'created_at', 'updated_at'
    ];

    public function category()
    {
        return $this->belongsTo(Category::class);
    }

    public function color()
    {
        return $this->belongsTo(Color::class);
    }

    public function getCoverAttribute($value)
    {
        return $value;
    }

    public function scopePrice($query, $min_price, $max_price)
    {
        if ($min_price && $max_price)
            return $query->where('price', '>=', $min_price)
                ->where('price', '<=', $max_price);
    }

    public function orders()
    {
        return $this->belongsToMany(Order::class, 'order_details');
    }

    public function scopeCategory($query, $s)
    {
        if ($s)
            return $query->whereHas('category', function ($q) use ($s) {
                $q->where('name', $s);
            });
    }

    public function scopeSearch($query, $s)
    {
        if ($s)
            return $query->where('name', 'LIKE', "%$s%");
    }

    protected static function boot()
    {
        parent::boot();
        static::addGlobalScope(new ActiveScope);
    }
}
