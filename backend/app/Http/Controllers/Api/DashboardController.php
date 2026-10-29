<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Product;
use App\Models\Category;
use App\Models\Order;

class DashboardController extends Controller
{
    public function stats()
    {
        $totalProducts = Product::count();
        $totalCategories = Category::count();
        $totalOrders = Order::count();
        $totalRevenue = Order::where('status', 'completed')->sum('total_amount');

        return response()->json([
            'total_products' => $totalProducts,
            'total_categories' => $totalCategories,
            'total_orders' => $totalOrders,
            'total_revenue' => $totalRevenue,
        ], 200);
    }
}