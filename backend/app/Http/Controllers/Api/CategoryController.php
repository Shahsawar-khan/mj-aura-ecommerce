<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Category;
use Illuminate\Http\Request;
use Illuminate\Support\Str;

class CategoryController extends Controller
{
    // Get All Categories
    public function index()
    {
        return response()->json(Category::all(), 200);
    }

    // Create Category
    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255|unique:categories',
            'description' => 'nullable|string'
        ]);

        $validated['slug'] = Str::slug($request->name);

        $category = Category::create($validated);
        return response()->json($category, 201);
    }

    // Update Category
    public function update(Request $request, $id)
    {
        $category = Category::findOrFail($id);
        
        $validated = $request->validate([
            'name' => 'sometimes|string|max:255|unique:categories,name,'.$id,
            'description' => 'nullable|string'
        ]);

        if(isset($validated['name'])) {
            $validated['slug'] = Str::slug($request->name);
        }

        $category->update($validated);
        return response()->json($category, 200);
    }

    // Delete Category
    public function destroy($id)
    {
        Category::findOrFail($id)->delete();
        return response()->json(['message' => 'Category deleted'], 200);
    }
}