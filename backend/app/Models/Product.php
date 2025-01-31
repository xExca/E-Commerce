<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Product extends Model
{
    /** @use HasFactory<\Database\Factories\ProductFactory> */
    use HasFactory;

    protected $fillable = [
        'name',
        'price',
        'discount',
        'colors',
        'image',
        'quantity',
    ];

    protected $casts = [
        'colors' => 'array'
    ];
    

    public function colors()
    {
        return $this->belongsToMany(Color::class, 'product_color_size')
                    ->withPivot('size_id', 'stock', 'price')
                    ->withTimestamps();
    }
    public function sizes()
    {
        return $this->belongsToMany(Size::class, 'product_color_size')
                    ->withPivot('color_id', 'stock', 'price')
                    ->withTimestamps();
    }
}
