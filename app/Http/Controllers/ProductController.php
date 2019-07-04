<?php

namespace App\Http\Controllers;

use App\Product;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class ProductController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth:user', ['except' => ['index', 'show']]);
    }

    public function index(Request $request)
    {
        $products = Product::orderBy($request->query('sort', 'created_at'), $request->query('order', 'asc'))
            ->search($request->query('search'))
            ->category($request->query('category'))
            ->with('category')
            ->paginate($request->query('results', 9));

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
            'category_id' => 'required|numeric',
            'color_id' => 'numeric',
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
        $product = null;

        if ($request->query('id')) {
            $product = Product::where('id', $url)
                ->with(['category', 'color'])
                ->firstOrFail();
        } else {
            $product = Product::where('url', $url)
                ->with(['category', 'color'])
                ->firstOrFail();
        }
        return response()->json($product);
    }

    public function update(Request $request, $id)
    {
        $this->validate($request, [
            'name' => "required|max:300|unique:products,name,$id",
            'price' => 'required|numeric|between:3,99999999.99',
            'stock' => 'required|numeric|between:0,32767',
            'category_id' => 'required|numeric',
            'color_id' => 'numeric',
            'short_description' => 'required|max:400',
            'description' => 'required|string'
        ]);

        $product = Product::findOrFail($id);

        if ($request->hasFile('cover')) {
            Storage::delete($product->cover);
            $request->merge(['cover' => $request->file('cover')->store('products')]);
        }

        $request->merge(['url' => substr(str_slug($request->input('name')), 0, 191)]);

        $product->update($request->all());
        return response()->json($product);
    }

    public function destroy($id)
    { }
}
