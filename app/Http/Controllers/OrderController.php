<?php

namespace App\Http\Controllers;

use App\Order;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Jobs\OrderJob;
use Culqi\Culqi;

class OrderController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth:customer', ['only' => ['store']]);
        $this->middleware('auth:user', ['only' => ['update', 'count']]);
    }

    public function index(Request $request)
    {
        $orders = [];
        if (Auth::guard('user')->check()) {
            $orders = Order::orderBy($request->query('sort', 'created_at'), $request->query('order', 'asc'))
                ->search($request->query('search'))
                ->with(['payment', 'customer','state'])
                ->paginate($request->query('results', 9));

            return response()->json($orders);
        } else if (Auth::check()) {
            $orders = Order::latest()
                ->where('customer_id', Auth::user()->getJWTIdentifier())
                ->with('payment')
                ->paginate($request->query('results', 10));
            return response()->json($orders);
        }
        return response()
            ->json([
                'success' => false,
                'status' => 401,
                'message' => 'Unauthorized'
            ], 401);
    }

    public function show($id)
    {
        $order = Order::with(['payment', 'products', 'state','customer'])->findOrFail($id);

        if (Auth::guard('user')->check()) {
            return response()->json($order);
        } else if ($order->customer_id == Auth::user()->getJWTIdentifier()) {
            return response()->json($order);
        }
        return response()->json(['error' => 'not found.'], 404);
    }


    public function store(Request $request)
    {
        // DB::enableQueryLog();
        // dd(DB::getQueryLog());
        $this->validate($request, [
            'method' => 'required|in:credit_card,bank_deposit',
            'culqi_token' => 'required_unless:method,bank_deposit|nullable|string',
            'email' => 'required_unless:method,bank_deposit|nullable|email',
            'plus_info' => 'nullable|string|min:6',
            'items' => 'required',
            'items.*.id' => 'required|numeric',
            'items.*.quantity' => 'required|numeric'
        ]);
        $request->merge(['customer' => Auth::user()]);

        dispatch(new OrderJob($request->all()));

        return response()->json(['success' => 'Successfully']);
    }

    public function update(Request $request, $id)
    {
        $this->validate($request, [
            'state_id' => 'required|numeric|exists:states,id',
        ]);
        $order = Order::findOrFail($id);
        $order->update($request->only(['state_id']));
        return response()->json($order);
    }

    public function count()
    {
        $orders = Order::count();
        return response()->json($orders);
    }

    public function statusChanged(Request $request)
    {
        $this->validate($request, [
            'type' => 'required|in:order.status.changed',
            'data' => 'required|json'
        ]);

        $data = json_decode($request->input('data'), true);

        switch ($data['state']) {
            case 'paid':
                $order = Order::find($data['order_number'])->update([
                    'state_id' => 4
                ]);
                foreach ($order->products as $product) {
                    $product->decrement('stock', $product->pivot->quantity);
                }
                $order->payment()->update([
                    'amount' => $data['amount'],
                    'reference_code' => $data['id']
                ]);
                break;
            case 'expired':
                $order = Order::find($data['order_number'])->update([
                    'state_id' => 8
                ]);
                break;
            case 'deleted':
                $order = Order::find($data['order_number'])->update([
                    'state_id' => 1
                ]);
                break;
        }
        return response()->json(['response' => 'Webhook de Culqi recibido correctamente']);
    }
}