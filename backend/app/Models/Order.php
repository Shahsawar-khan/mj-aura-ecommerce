<?php

namespace App\Models;
use Illuminate\Database\Eloquent\Factories\HasFactory; // <-- YEH LINE ADD KAREIN
use Illuminate\Database\Eloquent\Model;

class Order extends Model
{
    use HasFactory;

    // Yeh line add karein
    protected $fillable = [
        'user_id', 'total_amount', 'status', 
        'payment_status', 'shipping_address'
    ];
}
