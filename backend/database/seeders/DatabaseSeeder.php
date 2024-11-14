<?php

namespace Database\Seeders;

use App\Models\User;
use App\Enum\RoleEnum;
use App\Enum\PermissionEnum;
use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Role;
use Spatie\Permission\Models\Permission;

class DatabaseSeeder extends Seeder
{
  /**
   * Seed the application's database.
   */
  public function run(): void
  {
    $userRole = Role::create(['name' => RoleEnum::User->value]);
    $commenterRole = Role::create(['name' => RoleEnum::Commenter->value]);
    $adminRole = Role::create(['name' => RoleEnum::Admin->value]);
    

    $manageFeaturesPermission = Permission::create([
      'name' => PermissionEnum::ManageFeatures->value,
    ]);

    $manageCommentsPermission = Permission::create([
      'name' => PermissionEnum::ManageComments->value,
    ]);
    $managePostPermission = Permission::create([
      'name' => PermissionEnum::ManagePosts->value,
    ]);
    $manageUsersPermission = Permission::create([
      'name' => PermissionEnum::ManageUsers->value,
    ]);
    $upvoteDownvotePermission = Permission::create([
      'name' => PermissionEnum::upvoteDownvotePermission->value,
    ]);

    $userRole->syncPermissions([$upvoteDownvotePermission]);
    $commenterRole->syncPermissions([$manageFeaturesPermission, $manageCommentsPermission]);
    $adminRole->syncPermissions([$manageFeaturesPermission, $manageCommentsPermission, $managePostPermission, $manageUsersPermission,$upvoteDownvotePermission]);
    User::factory()->create([
      'firstname' => 'John',
      'middlename' => 'B',
      'lastname' => 'Doe',
      'email' => 'admin@email.com',
      'username' => 'admin',
      'password'=> bcrypt('1234'),
    ])->assignRole(RoleEnum::Admin);

    User::factory()->create([
      'firstname' => 'Jane',
      'middlename' => 'A',
      'lastname' => 'Doe',
      'email' => 'commenter@email.com',
      'username' => 'commenter',
      'password'=> bcrypt('1234'),
    ])->assignRole(RoleEnum::Commenter);
    
    User::factory()->create([
      'firstname' => 'Joe',
      'middlename' => 'C',
      'lastname' => 'Doe',
      'email' => 'user@email.com',
      'username' => 'user',
      'password'=> bcrypt('1234'),
    ])->assignRole(RoleEnum::User);
  }
}
