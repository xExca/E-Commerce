<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

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
            'price' => fake()->randomFloat(2, 0, 1000),
            'image' => fake()->imageUrl(),
            'category' => fake()->randomElement(['CPU', 'GPU', 'Motherboard', 'RAM', 'Storage', 'Power Supply Unit', 'Case', 'Cooling', 'Peripherals']),
            'color' => fake()->randomElement(['red', 'blue', 'green', 'black', 'white', 'pink, yellow']),
            'brand' => fake()->randomElement(['Aigo', 'Antec', 'AOpen', 'ASRock', 'Asus', 'be quiet!', 'CaseLabs (defunct)', 'Chassis Plans', 'Cooler Master', 'Corsair', 'Deepcool', 'DFI', 'ECS', 'EVGA Corporation', 'Foxconn', 'Fractal Design', 'Gigabyte Technology', 'IBall', 'In Win Development', 'Lian Li', 'MSI', 'MiTAC']),
            'discount' => fake()->numberBetween(0, 99),
            'quantity' => fake()->numberBetween(1, 100),
        ];
    }
}
