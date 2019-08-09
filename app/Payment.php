<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Payment extends Model
{
    protected $guarded =[];
    protected $primaryKey = 'order_id';

    public function paymentType()
    {
        return $this->belongsTo(PaymentType::class);
    }

    public function order()
	{
	  	return $this->hasOne(Order::class);
    }
}
