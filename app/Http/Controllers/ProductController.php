<?php

namespace App\Http\Controllers;

use App\Product;
use Illuminate\Http\Request;

class ProductController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth:user', ['except' => ['index', 'show']]);
    }

    public function index(Request $request)
    {
        $products = Product::orderBy($request->query('sort', 'created_at'), $request->query('order', 'asc'))
            ->search($request->query('search', null))
            ->category($request->query('category', null))
            ->with('category')
            ->paginate($request->query('results', 10));

        return response()->json($products);
    }


    public function store(Request $request)
    {
        $this->validate($request, [
            'name' => 'required|max:300|unique:products,name',
            'price' => 'required|numeric|between:3,99999999.99',
            'stock' => 'nullable|numeric|between:0,32767',
            'short_description' => 'required|max:400',
            'description' => 'required',
            'cover' => 'required|image'
        ]);

        $request->merge([
            'cover' => $request->file('cover')->store('products'),
            'url' => substr(str_slug($request->input('name')), 0, 191)
        ]);

        $product = Product::create($request->all());
        return response()->json($product);
    }

    public function show(Request $request, $url)
    {
        $product = Product::where('url', $url)
            ->with(['category', 'color'])
            ->firstOrFail();
        return response()->json($product);
    }

    public function update(Request $request, $id)
    { }

    public function destroy($id)
    { }
}
