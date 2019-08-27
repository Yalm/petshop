<?php

namespace App;

use App\Scopes\ActiveScope;
use Illuminate\Database\Eloquent\Model;

class Shipping extends Model
{
    protected $primaryKey = 'order_id';
    public $timestamps = false;

    protected $fillable = [
        'order_id', 'departament_id', 'province_id','district_id','price'
    ];

    public function orders()
    {
        return $this->hasOne(Order::class);
    }
}
