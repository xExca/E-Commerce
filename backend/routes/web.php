<?php

use App\Models\JobListing;
use Illuminate\Support\Facades\Route;

Route::get('/', function () {
  $jobs = JobListing::all();
  dd($jobs[0]);
});
