<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ColorSize extends Model
{
  use HasFactory;
  protected $table = 'color_size';

  protected $fillable = ['color_id', 'size_id'];
}
