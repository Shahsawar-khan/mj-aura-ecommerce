<?php

namespace App\Models;
use Illuminate\Database\Eloquent\Factories\HasFactory; // <-- YEH LINE ADD KAREIN
use Illuminate\Database\Eloquent\Model;

class OrderItem extends Model
{
    use HasFactory;

    // Yeh line add karein
    protected $fillable = ['order_id', 'product_id', 'quantity', 'price'];
}
