<?php

namespace App\Http\Controllers;

use App\Order;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class OrderController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth:customer', ['only' => ['index', 'show']]);
    }

    public function index()
    {
        $orders = [];
        if (Auth::guard('user')->check()) {
            $orders = Order::latest()->paginate(10);
        } else {
            $orders = Order::latest()
                ->where('customer_id', Auth::payload()->get('sub'))
                ->with('payment')
                ->paginate(10);
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
    { }

    public function update(Request $request, $id)
    { }

    public function destroy($id)
    { }
}
