<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class PaymentType extends Model
{
    public $timestamps = false;

    public function payments()
    {
        return $this->hasMany(Payment::class);
    }
}
