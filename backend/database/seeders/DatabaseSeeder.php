<?php

namespace Database\Seeders;

use App\Models\User;
use App\Enum\RoleEnum;
use App\Models\Product;
use App\Enum\PermissionEnum;
use App\Models\Color;
use App\Models\ProductRating;
use Database\Factories\CartFactory;
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

    $colors = Color::factory()->count(10)->create();
    Product::factory(20)->create()->each(function ($product) use ($colors) {
        // Attach 1 to 3 random colors to each product
        $product->colors()->attach(
            $colors->random(rand(1, 3))->pluck('id')->toArray()
        );
    });
    
    User::factory()->count(10)->has(ProductRating::factory()->count(8)->state(function (array $attributes) {
      return ['product_id' => Product::query()->inRandomOrder()->value('id')];
    }))->create()->each(function ($user) {
      $user->assignRole(RoleEnum::cases()[rand(1, count(RoleEnum::cases()) - 1)]);
    });
    OrderFactory::new()->count(100)->create();

    CartFactory::new()->count(50)->create();


  }
}
