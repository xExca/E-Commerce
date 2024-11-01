<?php

use App\Models\User;
use App\Models\RoleListing;
use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

return new class extends Migration
{
  /**
   * Run the migrations.
   */
  public function up(): void
  {
    Schema::create('role_listings', function (Blueprint $table) {
      $table->id();
      $table->string('name');
      $table->timestamps();
    });

    Schema::create('role_user', function (Blueprint $table) {
      $table->id();
      $table->foreignIdFor(RoleListing::class)->constrained()->cascadeOnDelete();
      $table->foreignIdFor(User::class)->constrained()->cascadeOnDelete();
      $table->timestamps();
    });
  }

  /**
   * Reverse the migrations.
   */
  public function down(): void
  {
    Schema::dropIfExists('role_listings');
    Schema::dropIfExists('role_user');
  }
};
