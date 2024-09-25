<?php

use App\Http\Controllers\API\AuthController;
use App\Http\Controllers\API\StudentController;
use Illuminate\Support\Facades\Route;

Route::middleware('auth:sanctum')
    ->controller(StudentController::class)
    ->group(function () {
        Route::prefix('/student')->group(function () {
            Route::get('/edit/{id}', 'edit');
            Route::post('/update/{id}', 'update');
            Route::get('/delete/{id}', 'delete');
        });
        Route::get('/student-info', 'show');
        Route::post('/register', 'register');
    });

Route::controller(AuthController::class)->group(function () {
    Route::post('/logout', 'logout')->middleware('auth:sanctum');
    Route::post('/login', 'login');
    Route::post('/signup', 'signup');
});
