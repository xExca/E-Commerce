<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Size extends Model
{
  use HasFactory;
    //
    protected $fillable = ['size'];

    public function products()
    {
        return $this->belongsToMany(Product::class, 'product_color_size')
                    ->withPivot('color_id', 'stock', 'price')
                    ->withTimestamps();
    }
}
