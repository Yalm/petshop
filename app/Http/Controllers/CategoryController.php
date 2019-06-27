<?php

namespace App\Http\Controllers;

use App\Category;
use Illuminate\Http\Request;

class CategoryController extends Controller
{

    public function index()
    {
        $categories = Category::where('parent_id', null)
            ->with('categories')
            ->get();

        return response()->json($categories);
    }


    public function store(Request $request)
    { }

    public function update(Request $request, $id)
    { }

    public function destroy($id)
    { }
}
