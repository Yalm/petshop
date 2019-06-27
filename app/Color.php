<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Color extends Model
{

     /**
     * The attributes excluded from the model's JSON form.
     *
     * @var array
     */
    protected $hidden = [
        'created_at','updated_at'
    ];


    public function products()
    {
        return $this->hasMany(Product::class);
    }
}
