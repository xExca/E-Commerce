<?php

namespace Database\Seeders;

use App\Models\JobListing;
use App\Models\RoleListing;
use App\Models\User;
use App\Models\UserRole;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
  /**
   * Seed the application's database.
   */
  public function run(): void
  {

    RoleListing::create(['name' => 'admin']);
    RoleListing::create(['name' => 'buyer']);
    RoleListing::create(['name' => 'seller']);

    User::factory(10)->create();
  }
}
