<?php

namespace App\Http\Controllers;

use App\Color;
use Illuminate\Http\Request;

class ColorController extends Controller
{

    public function index()
    {
        $colors = Color::latest()
            ->paginate();

        return response()->json($colors);
    }


    public function store(Request $request)
    { }

    public function update(Request $request, $id)
    { }

    public function destroy($id)
    { }
}
