<?php

namespace App\Http\Controllers;

use App\Product;
use App\Transport;
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
            'description' => 'nullable|string|min:10',
            'category_id' => ['required', 'numeric', 'exists:categories,id', new NotParentCategory],
            'color_id' => 'nullable|numeric|exists:colors,id',
            'transport.depth' => 'nullable|numeric|between:0,32767',
            'transport.height' => 'nullable|numeric|between:0,32767',
            'transport.weight' => 'nullable|numeric|between:0,32767',
            'transport.width' => 'nullable|numeric|between:0,32767'
        ]);

        $request->merge([
            'url' => substr(str_slug($request->input('name')), 0, 191)
        ]);

        $product = Product::create($request->except(['cover','transport']));

        if($request->input('transport') && $request->input('transport.depth')) {
            Transport::create([
                'product_id' => $product->id,
                'depth' => $request->input('transport.depth'),
                'height' => $request->input('transport.height'),
                'weight' => $request->input('transport.weight'),
                'width' => $request->input('transport.width')
            ]);
        }

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
                ->with(['category', 'color','transport'])
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
            'color_id' => 'nullable|numeric|exists:colors,id',
            'short_description' => 'required|max:400',
            'description' => 'nullable|string|min:10',
            'transport.depth' => 'nullable|numeric|between:0,32767',
            'transport.height' => 'nullable|numeric|between:0,32767',
            'transport.weight' => 'nullable|numeric|between:0,32767',
            'transport.width' => 'nullable|numeric|between:0,32767'
        ]);

        $product = Product::findOrFail($id);
        $request->merge(['url' => substr(str_slug($request->input('name')), 0, 191)]);

        if($request->input('transport') && $request->input('transport.depth')) {
            Transport::updateOrCreate([
                'product_id' => $id,
                'depth' => $request->input('transport.depth'),
                'height' => $request->input('transport.height'),
                'weight' => $request->input('transport.weight'),
                'width' => $request->input('transport.width')
            ]);
        }

        $product->update($request->except(['cover','transport']));
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

    public function upload(Request $request, $id)
    {
        $product = Product::findOrFail($id);

        $this->validate($request, [
            'cover' => 'required|image'
        ]);

        if($product->cover) {
            Storage::delete($product->getOriginal('cover'));
        }

        $product->update([
            'cover' => $request->file('cover')->store('products')
        ]);

        return response()->json($product);
    }

    public function count()
    {
        $products = Product::count();
        return response()->json($products);
    }
}
