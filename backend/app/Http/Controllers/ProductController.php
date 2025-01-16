<?php

namespace App\Http\Controllers;

use App\Models\Product;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class ProductController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
      $product = Product::with('productRatings')->take(8)->get();
      return response()->json($product, 200);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(Product $product)
    {
        $test = $product::get();
        return response()->json($product, 200);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Product $product)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Product $product)
    {
        //
    }

    public function productSearchFilter (){
      
      $brand = Product::select('brand')->distinct()->get()->toArray();
      $color = Product::select('color')->distinct()->get();
      $category = Product::select('category')->distinct()->get();
      return response()->json(['brand' => $brand, 'color' => $color, 'category' => $category],200);
    }

    public function getProductWithRating(Product $product){
      $product = $product->with('productRatings')->get();
      return response()->json($product, 200);
    }
}
