<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use App\Models\Color;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Product>
 */
class ProductFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'name' => fake()->word(),
            'discount' => $this->faker->randomFloat(2, 0, 75),
            'category' => fake()->randomElement(['CPU', 'GPU', 'Motherboard', 'RAM', 'Storage', 'Power Supply Unit', 'Case', 'Cooling', 'Peripherals']),
            'brand' => fake()->randomElement(['Aigo', 'Antec', 'AOpen', 'ASRock', 'Asus', 'be quiet!', 'CaseLabs (defunct)', 'Chassis Plans', 'Cooler Master', 'Corsair', 'Deepcool', 'DFI', 'ECS', 'EVGA Corporation', 'Foxconn', 'Fractal Design', 'Gigabyte Technology', 'IBall', 'In Win Development', 'Lian Li', 'MSI', 'MiTAC']),
            'image' => $this->faker->imageUrl(640, 480, 'products'),
            'description' => $this->faker->paragraph,
        ];
    }
}
