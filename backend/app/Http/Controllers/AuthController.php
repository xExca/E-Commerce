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
    $creds = $request->validated();
    $auth = Auth::attempt($creds);
    if(!$auth ) {
      return response()->json(['message' => 'Invalid credentials'], 401);
    }
    $user = Auth::user();
    $token = $user->createToken('main')->plainTextToken;
    return response(compact('user', 'token'));
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
