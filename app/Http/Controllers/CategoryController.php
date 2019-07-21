<?php

namespace App\Http\Controllers;

use App\Category;
use Illuminate\Http\Request;

class CategoryController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth:user', ['except' => ['index']]);
    }

    public function index(Request $request)
    {
        $categories = Category::latest()
            ->search($request->query('search'))
            ->get();
        return response()->json($categories);
    }

    public function store(Request $request)
    {
        $this->validate($request, [
            'name' => 'required|max:191|unique:categories,name',
            'parent_id' => 'numeric|exists:categories,id',
        ]);

        $category = Category::create($request->only(['name', 'parent_id']));
        return response()->json($category);
    }

    public function show($id)
    {
        $category = Category::where('id', $id)
            ->where('actived', true)
            ->with(['categories' => function ($query) {
                $query->where('actived', true);
            }])->firstOrFail();

        return response()->json($category);
    }

    public function update(Request $request, $id)
    {
        $this->validate($request, [
            'name' => "required|max:191|unique:categories,name,$id",
            'parent_id' => 'nullable|numeric|exists:categories,id',
            'categories.*' => 'numeric|exists:categories,id'
        ]);
        $category = Category::findOrFail($id);

        Category::where('parent_id', $id)->update(['parent_id' => null]);
        if (!$request->input('parent_id')) {
            Category::whereIn('id', $request->input('categories'))->update(['parent_id' => $id]);
        }

        $category->update($request->only(['name', 'parent_id']));

        return response()->json($category);
    }

    public function destroy($id)
    {
        $category = Category::findOrFail($id);

        if ($category->products()->count() > 0) {
            $category->update(['actived' => false]);
            return response()->json($category);
        } else if ($category->categories()->count() > 0) {
            $category->update(['actived' => false]);
            Category::where('parent_id', $id)->update(['parent_id' => null]);
            return response()->json($category);
        }

        $category->delete();
        return response()->json($category);
    }
}
