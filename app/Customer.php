<?php

namespace App;

use App\Scopes\ActiveScope;
use Illuminate\Auth\Authenticatable;
use Laravel\Lumen\Auth\Authorizable;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Contracts\Auth\Authenticatable as AuthenticatableContract;
use Illuminate\Contracts\Auth\Access\Authorizable as AuthorizableContract;
use Tymon\JWTAuth\Contracts\JWTSubject;
use Illuminate\Auth\Passwords\CanResetPassword;
use Illuminate\Contracts\Auth\CanResetPassword as CanResetPasswordContract;
use Illuminate\Notifications\Notifiable;
use App\Notifications\CustomerResetPasswordNotification;
use App\Notifications\CustomerVerifyEmailNotification;
use App\Notifications\CustomerOrderNotification;

use Illuminate\Contracts\Auth\MustVerifyEmail as MustVerifyEmailContract;
use Illuminate\Auth\MustVerifyEmail;

class Customer extends Model implements JWTSubject, AuthenticatableContract, AuthorizableContract, CanResetPasswordContract, MustVerifyEmailContract
{
    use Authenticatable, Authorizable, CanResetPassword, Notifiable, MustVerifyEmail;

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'name', 'avatar', 'email', 'document_id', 'document_number', 'surnames', 'phone', 'password', 'email_verified_at'
    ];

    /**
     * The attributes excluded from the model's JSON form.
     *
     * @var array
     */
    protected $hidden = [
        'password', 'created_at', 'updated_at'
    ];

    public function getJWTIdentifier()
    {
        return $this->getKey();
    }

    public function getJWTCustomClaims()
    {
        return [
            'name' => $this->name,
            'avatar' => $this->avatar
        ];
    }

    public function sendPasswordResetNotification($token)
    {
        $this->notify(new CustomerResetPasswordNotification($token));
    }

    public function sendEmailVerificationNotification()
    {
        $this->notify(new CustomerVerifyEmailNotification());
    }

    public function sendOrderNotification($order)
    {
        $this->notify(new CustomerOrderNotification($order));
    }

    public function orders()
    {
        return $this->hasMany(Order::class);
    }

    public function scopeSearch($query, $s)
    {
        if ($s)
            return $query->where('name', 'LIKE', "%$s%")
                ->orWhere('email', 'LIKE', "%$s%")
                ->orWhere('surnames', 'LIKE', "%$s%");
    }

    public function setPasswordAttribute($value)
    {
        $this->attributes['password'] = app('hash')->make($value);
    }

    protected static function boot()
    {
        parent::boot();
        static::addGlobalScope(new ActiveScope);
    }
}
