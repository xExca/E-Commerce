<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Models\Order;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Gate;

class OrderController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $ordersQuery = Order::select('orders.id', 'orders.date_ordered', 'orders.status', 'orders.total_price',
            DB::raw("concat(users.firstname, ' ', users.lastname) as user"),
            'products.name as product_name')
            ->join('users', 'users.id', '=', 'orders.user_id')
            ->join('products', 'products.id', '=', 'orders.product_id')
            ->where('orders.deleted_at', null);

        return response()->json($ordersQuery->get(),200);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
      
        Gate::authorize('create', Order::class);

        return "Auth success";
    }

    /**
     * Display the specified resource.
     */
    public function show(Order $order)
    {
        $user = User::find($order->user_id);
        $order->user = $user->firstname . ' ' . $user->lastname;
        return response()->json($order);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Order $order)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Order $order)
    {
        try {
            $order->update(['deleted_at' => now()]);
            return response()->json(['success' => 'Order soft deleted successfully.']);
        } catch (\Exception $e) {
            Log::error($e->getMessage());
            return response()->json(['error' => 'Failed to soft delete order.'], 500);
        }
    }

    private function orders($cardSelected,$query){
      if ($cardSelected == 'delivered') {
        return $query->whereIn('orders.status', ['delivered', 'shipped']);
      } else if ($cardSelected == 'pending') {
        return $query->where('orders.status', 'pending');
      } else if ($cardSelected == 'cancelled') {
        return $query->where('orders.status', 'cancelled');
      } else {
        return $query->where('orders.status', 'LIKE', '%%');
      }
    }
}
