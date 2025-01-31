<?php

namespace Database\Factories;

use App\Models\Size;
use App\Models\Color;
use App\Models\Product;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Model>
 */
class ProductColorSizeFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
      return [
        'product_id' => Product::inRandomOrder()->first()->id, // Random product
        'color_id' => Color::inRandomOrder()->first()->id,     // Random color
        'size_id' => Size::inRandomOrder()->first()->id,       // Random size
        'stock' => $this->faker->numberBetween(1, 100),       // Random stock
        'price' => $this->faker->randomFloat(2, 10, 100),     // Random price
      ];
    }
}
