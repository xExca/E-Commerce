<?php

namespace Database\Seeders;

use App\Enum\RoleEnum;
use App\Enum\PermissionEnum;
use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Role;
use Spatie\Permission\Models\Permission;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;

class RolePermissionSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
      $roles = [
        RoleEnum::Admin->value => [
            ...PermissionEnum::cases(),
        ],
        RoleEnum::User->value => [
            PermissionEnum::ManageComments->value,
        ],
        RoleEnum::Staff->value => [
            PermissionEnum::ManageFeatures->value,
            PermissionEnum::ManageComments->value,
            PermissionEnum::upvoteDownvotePermission->value,
            PermissionEnum::viewDashbaord,
            PermissionEnum::viewUser,
            PermissionEnum::viewOrder,
        ],
    ];

      foreach ($roles as $roleName => $permissions) {
        $role = Role::where('name', $roleName)->first();
        $permissions = Permission::whereIn('name', $permissions)->get();
        $role->syncPermissions($permissions);
      }
    }
}
