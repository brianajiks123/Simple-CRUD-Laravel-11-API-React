<?php

use App\Http\Controllers\StudentController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

// Route::get('/user', function (Request $request) {
//     return $request->user();
// })->middleware('auth:sanctum');

Route::get('/v1/students', [StudentController::class,'index']);
Route::post('/v1/student', [StudentController::class,'store']);
Route::put('/v1/student/{id}', [StudentController::class,'update']);
Route::delete('/v1/student/{id}', [StudentController::class,'destroy']);
