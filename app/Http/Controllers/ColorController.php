<?php

namespace App\Http\Controllers;

use App\Color;
use Illuminate\Http\Request;

class ColorController extends Controller
{

    public function __construct()
    {
        $this->middleware('auth:user', ['except' => ['index']]);
    }

    public function index()
    {
        $colors = Color::latest()
            ->get();

        return response()->json($colors);
    }


    public function store(Request $request)
    {
        $this->validate($request, [
            'name' => 'required|max:191|unique:colors,name'
        ]);

        $color = Color::create($request->only('name'));
        return response()->json($color);
    }

    public function update(Request $request, $id)
    {
        $this->validate($request, [
            'name' => "required|max:191|unique:colors,name,$id"
        ]);

        $color = Color::findOrFail($id);

        $color->update($request->only(['name']));

        return response()->json($color);
    }

    public function destroy($id)
    {
        $color = Color::findOrFail($id);

        if ($color->products()->count() > 0) {
            $color->update(['actived' => false]);
            return response()->json($color);
        }
        $color->delete();
        return response()->json($color);
    }
}
