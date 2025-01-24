<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use App\Http\Requests\LoginRequest;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use App\Http\Requests\RegisterRequest;

class AuthController extends Controller
{
  public function register(RegisterRequest $request)
  {
    $validated = $request->validated();

    $user = User::create($validated);

    return response()->json([
      'user' => $user
    ]);
  }

  public function login(LoginRequest $request){
    $validated = $request->validated();

    $user = User::where('email', $validated['email'])->first();

    if(!$user || !Hash::check($validated['password'], $user->password)){
      return response()->json([
        'message' => 'Invalid credentials'
      ], 401);
    }

    $token = $user->createToken($request->email);

    return response()->json([
      'token' => $token->plainTextToken,
      'user' => $user,
      'permissions' => $user->roles->first()->permissions->pluck('name')->toArray(),
    ]);
  }

  public function logout(Request $request){
    $request->user()->tokens()->delete();

    return response()->json([
      'message' => 'Successfully logged out'
    ], 200);
  }
}
