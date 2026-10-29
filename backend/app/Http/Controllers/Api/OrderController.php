<?php
namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Order;
use App\Models\OrderItem;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class OrderController extends Controller
{
    public function store(Request $request)
    {
        $request->validate([
            'shipping_address' => 'required|string',
            'total_amount' => 'required|numeric',
            'items' => 'required|array',
            'items.*.product_id' => 'required|exists:products,id',
            'items.*.quantity' => 'required|integer',
            'items.*.price' => 'required|numeric',
        ]);

        try {
            DB::beginTransaction();

            $order = Order::create([
                'user_id' => $request->user()->id,
                'total_amount' => $request->total_amount,
                'shipping_address' => $request->shipping_address,
                'status' => 'pending',
                'payment_status' => 'unpaid', // Mock payment
            ]);

            foreach ($request->items as $item) {
                OrderItem::create([
                    'order_id' => $order->id,
                    'product_id' => $item['product_id'],
                    'quantity' => $item['quantity'],
                    'price' => $item['price'],
                ]);
            }

            DB::commit();
            return response()->json(['message' => 'Order placed successfully!', 'order' => $order], 201);
        } catch (\Exception $e) {
            DB::rollBack();
            return response()->json(['message' => 'Error placing order', 'error' => $e->getMessage()], 500);
        }
    }
}