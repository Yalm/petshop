<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Transport extends Model
{
    protected $primaryKey = 'product_id';
    public $timestamps = false;

    protected $fillable = [
        'product_id', 'depth', 'height','weight','width'
    ];

    public function product()
    {
        return $this->hasOne(Product::class);
    }
}
