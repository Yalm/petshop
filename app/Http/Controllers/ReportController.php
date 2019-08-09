<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Order;
use App\OrderDetail;

class ReportController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth:user');
    }

    public function topProducts(Request $request)
    {
        $this->validate($request, [
            'date_init' => 'string|date',
            'date_end' => 'string|date',
            'results' => 'numeric'
        ]);

        $products = OrderDetail::topProduct()
            ->date($request->only(['date_init', 'date_end']))
            ->paginate($request->query('results', 9));

        return response()->json($products);
    }

    public function purchases(Request $request)
    {
        $this->validate($request, [
            'date_init' => 'string|date',
            'date_end' => 'string|date',
            'results' => 'numeric'
        ]);

        $orders = Order::purchases()
            ->date($request->only(['date_init', 'date_end']))
            ->paginate($request->query('results', 9));

        return response()->json($orders);
    }

    public function topCustomer(Request $request)
    {
        $this->validate($request, [
            'date_init' => 'string|date',
            'date_end' => 'string|date',
            'results' => 'numeric'
        ]);

        $orders = Order::topCustomer()
            ->date($request->only(['date_init', 'date_end']))
            ->paginate($request->query('results', 9));

        return response()->json($orders);
    }
}
