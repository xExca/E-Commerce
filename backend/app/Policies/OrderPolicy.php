<?php

namespace App\Policies;

use App\Models\User;
use App\Models\Order;
use App\Enum\RoleEnum;
use Illuminate\Support\Facades\Log;
use Illuminate\Auth\Access\Response;
use Illuminate\Support\Facades\Auth;

class OrderPolicy
{
    /**
     * Determine whether the user can view any models.
     */
    public function viewAny(User $user): Response
    {
        // return $user->id === $user->order->user_id
        //     ? Response::allow()
        //     : Response::deny('You do not own this order.');
    }

    /**
     * Determine whether the user can view the model.
     */
    public function view(User $user, Order $order): Response
    {
        //
    }

    /**
     * Determine whether the user can create models.
     */
    public function create(User $user): Response
    {
      if ($user->hasPermissionTo('manage_posts')) {
        return Response::allow();
      }
    
    return Response::deny('You do not have permission to create an order.');
    }

    /**
     * Determine whether the user can update the model.
     */
    public function update(User $user, Order $order): bool
    {
        //
    }

    /**
     * Determine whether the user can delete the model.
     */
    public function delete(User $user, Order $order): bool
    {
        //
    }

    /**
     * Determine whether the user can restore the model.
     */
    public function restore(User $user, Order $order): bool
    {
        //
    }

    /**
     * Determine whether the user can permanently delete the model.
     */
    public function forceDelete(User $user, Order $order): bool
    {
        //
    }

    public function testPolicy (User $user, Order $order){
      Log::info('View any order policy checked for user ' . $user->id);
    }
}
