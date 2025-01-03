<?php

namespace Database\Seeders;

use App\Models\User;
use App\Enum\RoleEnum;
use App\Models\Product;
use App\Enum\PermissionEnum;
use App\Models\ProductRating;
use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Role;
use Database\Factories\OrderFactory;
use Database\Factories\ProductFactory;
use Spatie\Permission\Models\Permission;
use Database\Factories\ProductRatingFactory;

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

    Product::factory()->count(20000)->create();
    
    User::factory()->count(100)->has(ProductRating::factory()->count(8)->state(function (array $attributes) {
      return ['product_id' => Product::query()->inRandomOrder()->value('id')];
    }))->create()->each(function ($user) {
      $user->assignRole(RoleEnum::cases()[rand(1, count(RoleEnum::cases()) - 1)]);
    });
    OrderFactory::new()->count(10000)->create();
  }
}
