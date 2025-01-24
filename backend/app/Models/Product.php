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
    
    public function productRatings(){
        return $this->hasMany(ProductRating::class);
    }

    public function colors(){
        return $this->belongsToMany(Color::class);
    }
}
