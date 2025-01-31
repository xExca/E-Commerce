<?php

namespace App\Http\Controllers;

use App\Models\Product;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

class ProductController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
      $product = Product::with('colors', 'sizes')->where('id', 10)->get();
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
        $product = $product->with('colors.sizes')->where('id', $product->id)->first();
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
