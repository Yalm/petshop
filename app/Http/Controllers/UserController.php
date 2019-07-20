<?php

namespace App\Http\Controllers;

use App\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;

class UserController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth:user');
    }

    public function index(Request $request)
    {
        $users = User::orderBy($request->query('sort', 'created_at'), $request->query('order', 'asc'))
            ->where('id', '!=', Auth::user()->getJWTIdentifier())
            ->search($request->query('search'))
            ->paginate($request->query('results', 9));

        return response()->json($users);
    }

    public function store(Request $request)
    {
        $this->validate($request, [
            'name' => 'string|max:191|required',
            'surnames' => 'max:191|string',
            'avatar' => 'image',
            'email' => 'required|email|max:191|unique:users,email',
            'password' => 'required|min:6|max:191'
        ]);

        if ($request->hasFile('avatar')) {
            $request->merge(['avatar' => $request->file('avatar')->store('users')]);
        }

        $user = User::create($request->all());
        return response()->json($user);
    }

    public function update(Request $request, $id)
    {
        $this->validate($request, [
            'name' => 'string|max:191|required',
            'surnames' => 'max:191|string',
            'avatar' => 'image',
            'email' => "string|required|email|max:191|unique:users,email,$id",
            'password' => 'string|min:6|max:191'
        ]);

        $customer = Customer::findOrFail($id);

        if ($request->hasFile('avatar')) {
            Storage::delete($customer->avatar);
            $request->merge(['avatar' => $request->file('avatar')->store('users')]);
        }

        $customer->update($request->all());
        return response()->json($customer);
    }

    public function show($id)
    {
        $customer = Customer::findOrFail($id);
        return response()->json($customer);
    }

    public function destroy($id)
    {
        $customer = Customer::findOrFail($id);
        Storage::delete($customer->avatar);
        $customer->delete();
        return response()->json($customer);
    }
}
