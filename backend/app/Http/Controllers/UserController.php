<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;


class UserController extends Controller
{
    
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return User::paginate(10)->map(function($user) {
            return [
                'id' => $user->id,
                'firstname' => $user->firstname,
                'middlename' => $user->middlename,
                'lastname' => $user->lastname,
                'email' => $user->email,
                'role' => [
                    'value' => $user->roles->first()->id,
                    'label' => $user->getRoleNames()->first()
                ]
            ];
        });
        return response()->json($users);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(User $user)
    {
        $data = [
            'id' => $user->id,
            'firstname' => $user->firstname,
            'middlename' => $user->middlename,
            'lastname' => $user->lastname,
            'email' => $user->email,
            'role' => [
                'value' => $user->roles->first()->id,
                'label' => $user->roles->first()->name,
            ],
        ];

        return response()->json($data);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, User $user)
    {
        $user->syncRoles($request->role['label']);
        $user->update([
          'firstname' => $request->firstname,
          'middlename' => $request->middlename,
          'lastname' => $request->lastname,
          'email' => $request->email
        ]);
        return response()->json(['message' =>  'permissions updated']);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(User $user)
    {
        //
    }
}
