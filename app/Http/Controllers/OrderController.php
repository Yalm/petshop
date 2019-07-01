<?php

namespace App\Http\Controllers;

use App\Order;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Jobs\OrderJob;

class OrderController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth:customer', ['only' => ['index', 'show', 'store']]);
    }

    public function index(Request $request)
    {
        $orders = [];
        if (Auth::guard('user')->check()) {
            $orders = Order::latest()->paginate(10);
        } else {
            $orders = Order::latest()
                ->where('customer_id', Auth::payload()->get('sub'))
                ->with('payment')
                ->paginate($request->query('results', 10));
        }
        return response()->json($orders);
    }

    public function show($id)
    {
        $order = Order::with(['payment', 'products', 'state'])->findOrFail($id);

        if (Auth::guard('user')->check()) {
            return response()->json($order);
        } else if ($order->customer_id == Auth::payload()->get('sub')) {
            return response()->json($order);
        }
        return response()->json(['error' => 'not found.'], 404);
    }


    public function store(Request $request)
    {
        $this->validate($request, [
            'culqi_token' => 'required|string',
            'plus_info' => 'nullable|string|min:6',
            'items' => 'required',
            'items.*.id' => 'required|numeric',
            'items.*.quantity' => 'required|numeric'
        ]);

        $order = Order::create([
            'customer_id' => Auth::payload()->get('sub'),
            'plus_info' => $request->input('plus_info'),
            'state_id' => 4
        ]);
        dispatch(new OrderJob($order, $request->input('culqi_token'), $request->input('items')));
        return response()->json($order);
    }

    public function update(Request $request, $id)
    { }

    public function destroy($id)
    { }
}
