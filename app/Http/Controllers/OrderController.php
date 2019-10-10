<?php

namespace App\Http\Controllers;

use App\Order;
use App\Payment;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Jobs\OrderJob;
use Culqi\Culqi;
use Validator;

class OrderController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth:customer', ['only' => ['store']]);
        $this->middleware('auth:user', ['only' => ['update', 'count','payment']]);
    }

    public function index(Request $request)
    {
        $orders = [];
        if (Auth::guard('user')->check()) {
            $orders = Order::orderBy($request->query('sort', 'created_at'), $request->query('order', 'asc'))
                ->search($request->query('search'))
                ->with(['customer','state'])
                ->paginate($request->query('results', 9));

            return response()->json($orders);
        } else if (Auth::check()) {
            $orders = Order::latest()
                ->where('customer_id', Auth::user()->getJWTIdentifier())
                ->with('state')
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
        $order = Order::with(['payment', 'products', 'state','customer','shipping'])->findOrFail($id);

        if (Auth::guard('user')->check()) {
            return response()->json($order);
        } else if ($order->customer_id == Auth::user()->getJWTIdentifier()) {
            return response()->json($order);
        }
        return response()->json(['error' => 'not found.'], 404);
    }


    public function store(Request $request)
    {
        $this->validate($request, [
            'method' => 'required|in:credit_card,bank_deposit',
            'culqi_token' => 'required_unless:method,bank_deposit|nullable|string',
            'email' => 'required_unless:method,bank_deposit|nullable|email',
            'plus_info' => 'nullable|string|min:6',
            'items' => 'required',
            'items.*.id' => 'required|numeric',
            'items.*.quantity' => 'required|numeric',
            'shipping' => 'required|boolean',
            'department' => 'required_if:shipping,true',
            'province' => 'required_if:shipping,true'
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

    public function payment(Request $request)
    {
        $this->validate($request, [
            'order_id' => 'required|numeric|exists:orders,id',
            'amount' => 'required|numeric|between:0,99999999',
            'decrease_stock' => 'required',
        ]);

        $payment = Payment::create([
            'order_id' => $request->input('order_id'),
            'amount' => $request->input('amount'),
            'payment_type_id' => 3
        ]);

        if($request->input('decrease_stock')) {
            $order = Order::find($request->input('order_id'));

            foreach ($order->products as $product) {
                $product->decrement('stock', $product->pivot->quantity);
            }
        }

        return response()->json($payment);
    }

    public function statusChanged(Request $request)
    {
        $this->validate($request, [
            'type' => 'required|in:order.status.changed',
            'data' => 'required|json'
        ]);

        $data = json_decode($request->input('data'), true);

        $validator = Validator::make($data, [
            'id' => 'required|string',
            'state' => 'required|in:paid,expired,deleted',
            'amount' => 'required|numeric',
            'order_number' => 'required|string'
        ]);

        $id = explode('-', $data['order_number']);

        if ($validator->passes() && count($id) > 1) {
            switch ($data['state']) {
                case 'paid':
                    $order = Order::findOrFail($id[1])->update([
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
                    $order = Order::findOrFail($id[1])->update([
                        'state_id' => 8
                    ]);
                    break;
                case 'deleted':
                    $order = Order::findOrFail($id[1])->update([
                        'state_id' => 1
                    ]);
                break;
            }
            return response()->json(['response' => 'Webhook de Culqi recibido correctamente']);
        } else {
            return response()->json($validator->errors()->all(),422);
        }
    }
}
