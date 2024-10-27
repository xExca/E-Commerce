<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use App\Http\Requests\LoginRequest;
use App\Http\Controllers\Controller;
use App\Http\Requests\RegisterRequest;
use Illuminate\Support\Facades\Auth;

class AuthController extends Controller
{
  public function login(LoginRequest $request)
  {
    return response(['user' => $request->user()]);
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
  public function checkEmail(Request $request)
  {
      $email = $request->input('email');
      $user = User::where('email', $email)->first();
      if ($user) {
          return response()->json(['exists' => true]);
      }
      return response()->json(['exists' => false]);
  }
  public function register(RegisterRequest $request)
  {
    $request->validated();
  $user = User::create($request->all());
  if ($user) {
    return response(['success' => true]);
  }
  return response(['message' => 'Error creating user'], 500);
  } 
}
