<?php

namespace App\Http\Controllers;

use App\Category;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class CategoryController extends Controller
{

    public function index(Request $request)
    {
        $categories = [];
        if (Auth::guard('user')->check()) {
            $categories = Category::orderBy($request->query('sort', 'created_at'), $request->query('order', 'asc'))
                ->search($request->query('search'))
                ->paginate($request->query('results', 10));
        } else {
            $categories = Category::where('parent_id', null)
                ->with('categories')
                ->paginate();
        }

        return response()->json($categories);
    }

    public function store(Request $request)
    {
        $this->validate($request, [
            'name' => 'required|max:191|unique:categories,name',
            'category_id' => 'numeric|exists:categories,id',
        ]);

        $category = Category::create($request->all());
        return response()->json($category);
    }

    public function show($id)
    {
        $category = Category::findOrFail($id);
        return response()->json($category);
    }

    public function update(Request $request, $id)
    {
        $this->validate($request, [
            'name' => "required|max:300|unique:products,name,$id",
            'category_id' => 'numeric|exists:categories,id'
        ]);
        $category = Category::findOrFail($id);
        $category->categories();
        $category->update($request->all());

        return response()->json($category);
    }

    public function destroy($id)
    { }
}
