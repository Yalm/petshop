<?php

namespace App\Http\Controllers;

use App\Product;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use App\Rules\NotParentCategory;

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
            'description' => 'string|min:10',
            'category_id' => ['required', 'numeric', 'exists:categories,id', new NotParentCategory],
            'color_id' => 'numeric|exists:colors,id',
            'cover' => 'required|image'
        ]);

        $request->merge([
            'url' => substr(str_slug($request->input('name')), 0, 191)
        ]);

        $data = $request->except('cover');
        $data['cover'] = $request->file('cover')->store('products');

        $product = Product::create($data);
        return response()->json($product);
    }

    public function show(Request $request, $url)
    {
        $product = null;

        if ($request->query('url')) {
            $product = Product::where('url', $url)
                ->where('actived', true)
                ->with(['category', 'color'])
                ->firstOrFail();
        } else {
            $product = Product::where('id', $url)
                ->where('actived', true)
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
            'category_id' => ['required', 'numeric', 'exists:categories,id', new NotParentCategory],
            'color_id' => 'numeric|exists:colors,id',
            'short_description' => 'required|max:400',
            'description' => 'string|min:10'
        ]);

        $product = Product::findOrFail($id);
        $request->merge(['url' => substr(str_slug($request->input('name')), 0, 191)]);

        $data = $request->except('cover');

        if ($request->hasFile('cover')) {
            Storage::delete($product->getOriginal('cover'));
            $data['cover'] =  $request->file('cover')->store('products');
        }

        $product->update($data);
        return response()->json($product);
    }

    public function destroy($id)
    {
        $product = Product::findOrFail($id);

        if ($product->orders()->count() > 0) {
            $product->update(['actived' => false]);
            return response()->json($product);
        }
        Storage::delete($product->getOriginal('cover'));
        $product->delete();
        return response()->json($product);
    }

    public function count()
    {
        $products = Product::count();
        return response()->json($products);
    }
}
