<?php

namespace Database\Seeders;

use App\Models\Size;
use App\Models\User;
use App\Models\Color;
use App\Enum\RoleEnum;
use App\Models\Product;
use App\Models\ColorSize;
use App\Models\ProductColorSize;
use Database\Factories\ProductColorSizeFactory;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Database\Factories\CartFactory;
use Database\Factories\OrderFactory;

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

    
    Size::insert([
      ['name' => '128'],
      ['name' => '256'],
      ['name' => '512'],
      ['name' => '1024'],
      ['name' => '2048'],
  ]);
  
    Color::insert([
      ['name'=>'Red', 'hex'=>'#FF0000'],
      ['name'=>'Green', 'hex'=>'#00FF00'],
      ['name'=>'Blue', 'hex'=>'#0000FF'],
      ['name'=>'Yellow', 'hex'=>'#FFFF00'],
      ['name'=>'Purple', 'hex'=>'#FF00FF'],
    ]);

    $products = Product::factory()->count(10)->create();

    // Generate data for product_color_size
    ProductColorSize::factory(10)->create();
  }
}
