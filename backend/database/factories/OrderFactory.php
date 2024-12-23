<?php

namespace Database\Factories;

use App\Models\User;
use App\Models\Order;
use App\Models\Product;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Order>
 */
class OrderFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    protected $model = Order::class;

    public function definition(): array
    {
        $user = User::inRandomOrder()->first();
        $product = Product::inRandomOrder()->first();
        return [
          'user_id' => $user->id,
          'product_id' => $product->id,
          'date_ordered' => $this->faker->date,
          'status' => $this->faker->randomElement(['pending', 'shipped', 'delivered', 'cancelled']),
          'total_price' => $this->faker->randomFloat(2, 1, 100),
        ];
    }
}
