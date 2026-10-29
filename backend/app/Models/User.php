<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens; // <-- Yeh line add karein

class User extends Authenticatable
{
    use HasApiTokens, HasFactory, Notifiable; // <-- HasApiTokens yahan add karein

    protected $fillable = [
        'name',
        'email',
        'password',
        'role', // <-- Yeh add karein
    ];

    protected $hidden = [
        'password',
        'remember_token',
    ];

    protected function casts(): array
    {
        return [
            'email_verified_at' => 'datetime',
            'password' => 'hashed',
        ];
    }
}