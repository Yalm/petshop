<?php

namespace App\Http\Controllers;

use App\Customer;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class CustomerController extends Controller
{

    public function index()
    { }


    public function store(Request $request)
    { }

    public function update(Request $request, $id)
    {
        if (Auth::guard('user')->check()) {
            $customer = Auth::user()->update($request->all());
            return response()->json($customer);
        } else {
            $customer = Auth::user()->update($request->except(['email']));
            return response()->json($customer);
        }
    }

    public function destroy($id)
    { }
}
