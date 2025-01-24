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
      $cart = Cart::updateOrCreate(
        ['user_id' => $request->user_id, 'product_id' => $request->product_id],
        ['quantity' => Cart::where('user_id', $request->user_id)
          ->where('product_id', $request->product_id)
          ->value('quantity') + $request->quantity,
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
        // return response()->json(['message' => 'Item removed from cart'], 200);
        $cart->delete();
        return response()->json(['message' => 'Item removed from cart'], 200);
    }

    public function updateQuantity(Request $request){
      $cart = Cart::where('user_id', $request->user_id)
        ->where('product_id', $request->product_id)
        ->first();

      if($request->action == 'increment'){
        $cart->increment('quantity');
      }

      if($request->action == 'decrement'){
        $cart->decrement('quantity');
      }

      return response()->json(['message' => 'Quantity updated', 'cartItem' => $cart], 200);
    }
}
