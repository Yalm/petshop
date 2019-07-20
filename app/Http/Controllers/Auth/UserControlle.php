<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;
use Illuminate\Http\Request;
use Laravel\Socialite\Facades\Socialite;
use App\User;

class UserController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth:user', ['except' => ['social', 'login']]);
    }

    public function login(Request $request)
    {
        $this->validate($request, [
            'password' => 'required|min:6|string',
            'email' => 'required|email|string|max:191'
        ]);

        $credentials = $request->only(['email', 'password']);
        if (!$token = Auth::guard('user')->attempt($credentials)) {
            return response()->json(['code' => 'auth/user-not-found'], 401);
        } else if (!Auth::guard('user')->user()->actived) {
            Auth::guard('user')->logout();
            return response()->json(['code' => 'auth/user-disabled'], 401);
        }

        return $this->respondWithToken($token);
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
            ->stateless()
            ->user();
        $user = User::where('email', $oauth->getEmail())->firstOrFail();
        $token = Auth::guard('user')->fromUser($user);
        return $this->respondWithToken($token);
    }

    public function me()
    {
        return response()->json(Auth::guard('user')->user());
    }

    public function refresh()
    {
        return $this->respondWithToken(Auth::guard('user')->refresh());
    }

    public function logout()
    {
        Auth::guard('user')->logout();

        return response()->json(['message' => 'Successfully logged out']);
    }

    protected function respondWithToken($token)
    {
        return response()->json([
            'access_token' => $token,
            'token_type' => 'bearer',
            'expires_in' => Auth::guard('user')->factory()->getTTL() * 60
        ]);
    }
}
