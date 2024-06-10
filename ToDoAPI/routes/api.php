<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Models\User;
use App\Models\Jobs;
use App\Models\Assistants;
use App\Models\Characters;
use Illuminate\Auth\Access\AuthorizationException;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use Symfony\Component\HttpKernel\Exception\HttpException;
use Illuminate\Foundation\Validation\ValidationException;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\JobsController;

// authentication
Route::post('/register', [AuthController::class, 'DangKy']);
Route::post('/login', [AuthController::class, 'DangNhap']);
// Route::middleware('auth:sanctum')->post('/logout', [AuthController::class, 'DangXuat']);

// Test get Jobs
// Route::middleware('auth:sanctum')->get('/jobGet', [JobsController::class, 'GetAllJobs']);
// Route::middleware('auth:sanctum')->post('/jobPost', [JobsController::class, 'AddJob']);


Route::group(['middleware' => ['auth:sanctum']], function () {
    // Interact with Job Data
    Route::get('/jobGet', [JobsController::class, 'GetAllJobs']);
    Route::post('/jobPost', [JobsController::class, 'AddJob']);
    Route::get('/jobs/{id}', [JobsController::class, 'JobDetails']);
    Route::put('/jobs/{id}', [JobsController::class, 'Update']);
    Route::delete('/jobs/{id}', [JobsController::class, 'Destroy']);
    // User information
    Route::post('/logout', [AuthController::class, 'DangXuat']);
    Route::get('/profile/{id}', [AuthController::class, 'Profile']);
});

// Route::middleware('auth:api')->get('/user', function (Request $request) {
//     return $request->user();
// });

