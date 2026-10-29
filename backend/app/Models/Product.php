<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Product extends Model
{
    use HasFactory;

    protected $fillable = [
        'category_id', 'name', 'slug', 'description', 
        'price', 'stock_quantity', 'image_path'
    ];

    // YEH FUNCTION ADD KAREIN
    public function category()
    {
        return $this->belongsTo(Category::class);
    }
}