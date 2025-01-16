<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Cart extends Model
{
    /** @use HasFactory<\Database\Factories\CartFactory> */
    use HasFactory;

    protected $fillable = [
      'user_id',
      'product_id',
      'quantity',
      'variant',
    ];

    protected $casts = [
      'variant' => 'json',
    ];

    public function product(){
      return $this->belongsTo(Product::class);
    }
}
