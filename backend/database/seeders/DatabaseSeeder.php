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
    
    $this->call([
      RoleSeeder::class,
      PermissionSeeder::class,
      RolePermissionSeeder::class,
    ]);

    
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
    ])->assignRole(RoleEnum::Staff);
    
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
