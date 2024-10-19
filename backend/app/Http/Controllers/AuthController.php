<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Requests\LoginRequest;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;

class AuthController extends Controller
{
  public function login(LoginRequest $request)
  {
    $creds = $request->validated();
    if (!Auth::attempt($creds)) {
      return response([
        'message' => 'Provided email address or password is incorrect'
      ], 422);
    }

    $user = Auth::user();

    return response([
      'user' => $user
    ]);
  }
}
