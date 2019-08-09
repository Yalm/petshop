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
            ->where('id', '!=', Auth::guard('user')->user()->getJWTIdentifier())
            ->search($request->query('search'))
            ->paginate($request->query('results', 9));

        return response()->json($users);
    }

    public function store(Request $request)
    {
        $this->validate($request, [
            'name' => 'string|max:191|required',
            'surnames' => 'max:191|string',
            'email' => 'required|email|max:191|unique:users,email',
            'password' => 'required|min:6|max:191'
        ]);

        $data = $request->except('avatar');

        if ($request->hasFile('avatar')) {
            $data['avatar'] =  $request->file('avatar')->store('users');
        }

        $user = User::create($data);
        return response()->json($user);
    }

    public function update(Request $request, $id)
    {
        $this->validate($request, [
            'name' => 'string|max:191|required',
            'surnames' => 'max:191|string',
            'email' => "string|required|email|max:191|unique:users,email,$id",
            'password' => 'nullable|string|max:191'
        ]);

        $user = User::findOrFail($id);
        $data = $request->except('avatar');

        if ($request->hasFile('avatar')) {
            Storage::delete($user->getOriginal('avatar'));
            $data['avatar'] =  $request->file('avatar')->store('users');
        }

        $user->update($data);
        return response()->json($user);
    }

    public function show($id)
    {
        $user = User::findOrFail($id);
        return response()->json($user);
    }

    public function destroy($id)
    {
        $user = User::findOrFail($id);
        Storage::delete($user->getOriginal('avatar'));
        $user->delete();
        return response()->json($user);
    }

    public function changePassword(Request $request)
    {
        $this->validate($request, [
            'current_password' => 'required|string|min:6|max:191',
            'password' => 'required|string|min:6|max:191|confirmed'
        ]);

        if (app('hash')->check($request->get('current_password'), Auth::guard('user')->user()->password)) {
            return response()->json(['message' => 'Su contraseña actual no coincide con la contraseña que proporcionó. Inténtalo de nuevo.'], 422);
        }

        if (strcmp($request->get('current_password'), $request->get('password')) == 0) {
            return response()->json(['message' => 'La nueva contraseña no puede ser igual a su contraseña actual. Por favor, elija una contraseña diferente.'], 422);
        }

        //Change Password
        Auth::guard('user')->user()->update([
            ['password' => app('hash')->make($request->input('password'))]
        ]);

        return response()->json(['success' => 'Contraseña cambiada con éxito!']);
    }
}
