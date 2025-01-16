<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\CartController;
use App\Http\Controllers\OrderController;
use App\Http\Controllers\RoleController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\ProductController;

Route::get('/user', function (Request $request) {
  return $request->user();
})->middleware('auth:sanctum');

Route::post('/truds', function (Request $request) {
  return response()->json($request->name);
});
Route::post('/login', [AuthController::class, 'login']);
Route::get('/checkEmail', [AuthController::class,'checkEmail']);
Route::post('/register',[AuthController::class,'register']);
Route::post('/logout',[AuthController::class,'logout']);

// Route::get('/users/{user}', [UserController::class, 'show']);
Route::prefix('admin')->group(function () {
    Route::resource('users', UserController::class);
    Route::resource('roles', RoleController::class);
    Route::resource('products', ProductController::class);
    Route::resource('orders', OrderController::class);
    Route::get('permissions', [RoleController::class, 'permissions']);
    Route::get('filter', [ProductController::class, 'productSearchFilter']);
    Route::resource('cart', CartController::class);
})->middleware('auth:sanctum');