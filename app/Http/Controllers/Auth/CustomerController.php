<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;
use Illuminate\Http\Request;
use Laravel\Socialite\Facades\Socialite;
use App\Customer;
use Illuminate\Auth\Events\Registered;

class CustomerController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth:customer', ['except' => ['social', 'login', 'register']]);
    }

    public function login(Request $request)
    {
        $this->validate($request, [
            'password' => 'required|min:6|string',
            'email' => 'required|email|string|max:191'
        ]);

        $credentials = $request->only(['email', 'password']);
        if (!$token = Auth::attempt($credentials)) {
            return response()->json(['code' => 'auth/user-not-found'], 401);
        } else if (Auth::user()->actived == 0) {
            Auth::logout();
            return response()->json(['code' => 'auth/user-disabled'], 401);
        }

        return $this->respondWithToken($token);
    }

    public function register(Request $request)
    {
        $this->validate($request, [
            'name' => 'required|min:5|string|max:191',
            'password' => 'required|min:6|string',
            'email' => 'required|email|string|max:191|unique:customers'
        ]);

        $customer = Customer::create($request->all());
        event(new Registered($customer));

        return response()->json(['success' => true]);
    }

    public function social($provider, Request $request)
    {
        $request->merge(['provider' => $provider]);
        $request->merge(['code' => $request->input('oauthData.code')]);

        $this->validate($request, [
            'provider' => 'required|ends_with:google',
            'code' => 'required'
        ]);

        $oauth = Socialite::driver($provider)
            ->redirectUrl($request->input('authorizationData.redirect_uri'))
            ->stateless()
            ->user();

        $customer = Customer::updateOrCreate(
            ['email' => $oauth->getEmail()],
            ['name' => $oauth->getName(), 'avatar' => $oauth->getAvatar()]
        );

        if ($customer->actived = 0) {
            return response()->json(['code' => 'auth/user-disabled'], 401);
        }

        $token = Auth::fromUser($customer);
        return $this->respondWithToken($token);
    }

    public function me()
    {
        return response()->json(Auth::user());
    }

    public function refresh()
    {
        return $this->respondWithToken(Auth::refresh());
    }

    public function logout()
    {
        Auth::logout();

        return response()->json(['message' => 'Successfully logged out']);
    }

    protected function respondWithToken($token)
    {
        return response()->json([
            'access_token' => $token,
            'token_type' => 'bearer',
            'expires_in' => Auth::factory()->getTTL() * 60
        ]);
    }
}
