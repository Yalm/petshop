<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Document extends Model
{
    public $timestamps = false;

    protected $fillable = ['name', 'length'];
}
