<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Spatie\Permission\Models\Role;
use Illuminate\Container\Attributes\Log;
use Spatie\Permission\Models\Permission;
use Illuminate\Database\Eloquent\Model;

class RoleController extends Controller
{
    public function index()
    {
      $role = Role::all()->map(function ($role) {
        return [
            'id' => $role->id,
            'name' => $role->name,
          ];
      });
      return response()->json($role);
    }

    public function store(Request $request)
    {
        //
    }
    public function show(Role $role)
    {
      $roleData = [
        'id' => $role->id,
        'name' => $role->name,
        'permissions' => $role->permissions->map(function ($permission) {
          return [
            'value' => $permission->id,
            'label' => $permission->name,
          ];
        })->toArray(),
      ];
      return response()->json($roleData);
    }
    public function update(Request $request, Role $role)
    {
        $role->update(['name' => $request->rolename]);
        $role->syncPermissions($request->permission);
        return response()->json(['message' => 'Role updated successfully']);
    }
    public function destroy(string $id)
    {
        //
    }

    public function permissions()
    {
        $permissions = Permission::all()->map(function ($permission) {
            return [
                'value' => $permission->id,
                'label' => $permission->name,
            ];
        });
        return response()->json($permissions);   
    }
}
