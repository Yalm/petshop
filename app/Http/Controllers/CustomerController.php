<?php

namespace App\Http\Controllers;

use App\Customer;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class CustomerController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth:user', ['except' => ['update']]);
    }

    public function index(Request $request)
    {
        $customers = Customer::orderBy($request->query('sort', 'created_at'), $request->query('order', 'asc'))
            ->search($request->query('search'))
            ->withCount('orders')
            ->paginate($request->query('results', 9));

        return response()->json($customers);
    }

    public function update(Request $request, $id)
    {
        if (Auth::guard('user')->check()) {
            $this->validate($request, [
                'name' => 'max:191|required',
                'surnames' => 'max:191|string',
                'document_id' => 'numeric|exists:documents,id',
                'document_number' => 'string|max:20',
                'email' => "required|email|max:191|unique:customers,email,$id",
                'password' => 'min:6|max:191'
            ]);
            $customer = Customer::findOrFail($id);
            $customer->update($request->all());
            return response()->json($customer);
        } else if (Auth::check()) {
            $this->validate($request, [
                'name' => 'max:191|required',
                'surnames' => 'max:191|string',
                'document_id' => 'numeric|exists:documents,id',
                'document_number' => 'numeric',
                'phone' => 'string'
            ]);
            $customer = Auth::user()->update($request->only(['name', 'surnames', 'document_id', 'document_number','phone']));
            return response()->json($customer);
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
        $customer = Customer::where('id', $id)
            ->with(['orders.payment.paymentType', 'orders.state'])
            ->firstOrFail();
        return response()->json($customer);
    }

    public function destroy($id)
    {
        $customer = Customer::findOrFail($id);

        if ($customer->orders()->count() > 0) {
            $customer->update(['actived' => false]);
            return response()->json($customer);
        }

        $customer->delete();
        return response()->json($customer);
    }

    public function count()
    {
        $customers = Customer::count();
        return response()->json($customers);
    }
}
