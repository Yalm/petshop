<?php
namespace App\Http\Controllers\Auth;

use Illuminate\Auth\Passwords\PasswordBrokerManager;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class ForgotPasswordController extends Controller
{
    /*
    |--------------------------------------------------------------------------
    | Password Reset Controller
    |--------------------------------------------------------------------------
    |
    | This controller is responsible for handling password reset emails and
    | includes a trait which assists in sending these notifications from
    | your application to your users. Feel free to explore this trait.
    |
    */
    /**
     * Create a new controller instance.
     *
     * @return void
     */
    /**
     * Send a reset link to the given user.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */

    public function sendResetLinkEmail(Request $request)
    {
        $this->validate($request, [
            'email' => 'required|string|email|max:191|exists:customers,email'
        ]);

        $this->broker()->sendResetLink($request->only('email'));
        return response()->json(true);
    }

    public function broker()
    {
        $passwordBrokerManager = new PasswordBrokerManager(app());
        return $passwordBrokerManager->broker();
    }
}
