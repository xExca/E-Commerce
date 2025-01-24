<?php

namespace Database\Factories;

use App\Models\User;
use App\Enum\RoleEnum;
use App\Models\Product;
use App\Models\Color;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Cart>
 */
enum Size: string {
  case SMALL = 'small';
  case MEDIUM = 'medium';
  case LARGE = 'large';
}
class CartFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'product_id' => Product::query()->inRandomOrder()->value('id'),
            'user_id' => User::query()->whereHas('roles', function ($query) {
                $query->whereIn('name', [RoleEnum::User]);
            })->inRandomOrder()->value('id'),
            'quantity' => fake()->numberBetween(1, 5),
            'variant' => array_filter([
                'size' => fake()->optional()->randomElement(Size::cases()),
                'color' => Color::query()->inRandomOrder()->value('id'),
            ]),
        ];
    }
}
