<?php

namespace App\Http\Controllers;

use App\Models\Cart;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class CartController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
      $cart = Cart::create([
        'user_id' => $request->user_id,
        'product_id' => $request->product_id,
        'quantity' => $request->quantity,
        'variant' => 'red'
      ]);
      return response()->json($cart, 200);
    }

    /**
     * Display the specified resource.
     */
    public function show(User $cart)
    {
        $response = $cart->shoppingCart()->with('product')->get();
        return response()->json($response, 200);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Cart $cart)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Cart $cart)
    {
        //
    }
}
