<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Order;

class ReportController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth:user');
    }

    public function topProducts(Request $request)
    {
        $this->validate($request, [
            'date_init' => 'required|string|date',
            'date_end' => 'required|string|date',
            'results' => 'numeric'
        ]);

        $products = Order::topProduct($request->only(['date_init', 'date_end']))
            ->whereBetween('orders.created_at', $request->only(['date_init', 'date_end']))
            ->paginate($request->query('results', 9));

        return response()->json($products);
    }

    public function purchases(Request $request)
    {
        $this->validate($request, [
            'date_init' => 'required|string|date',
            'date_end' => 'required|string|date',
            'results' => 'numeric'
        ]);

        $orders = Order::purchases()
            ->whereBetween('orders.created_at', $request->only(['date_init', 'date_end']))
            ->paginate($request->query('results', 9));

        return response()->json($orders);
    }

    public function topCustomer(Request $request)
    {
        $this->validate($request, [
            'date_init' => 'required|string|date',
            'date_end' => 'required|string|date',
            'results' => 'numeric'
        ]);

        $model = Order::topCustomer()
            ->whereBetween('orders.created_at', $request->only(['date_init', 'date_end']))
            ->paginate($request->query('results', 9));

        return response()->json($model);
    }
}
