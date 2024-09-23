<?php

use App\Http\Controllers\API\AuthController;
use App\Http\Controllers\API\StudentController;
use Illuminate\Support\Facades\Route;

Route::get('/student-info', [StudentController::class, 'getStudentInfo']);
Route::post('/register', [StudentController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);
Route::post('/signup', [AuthController::class, 'signup']);
Route::post('/logout', [AuthController::class, 'logout'])->middleware('auth:sanctum');
