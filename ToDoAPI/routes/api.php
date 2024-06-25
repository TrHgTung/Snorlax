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

Route::group(['middleware' => ['auth:sanctum']], function () {
    // Interact with Job Data
    Route::get('/jobs', [JobsController::class, 'GetAllJobs']);
    Route::get('/jobs/finished', [JobsController::class, 'XemCacJobsDaHoanThanh']);
    Route::post('/jobPost', [JobsController::class, 'AddJob']);
    //Route::get('/job/{id}', [JobsController::class, 'JobDetails']);
    Route::put('/edit/job/{id}', [JobsController::class, 'Update']);
    Route::patch('/finish/job/{id}', [JobsController::class, 'Finish']);
    // Route::delete('/job/{id}', [JobsController::class, 'Destroy']);
    // User information
    Route::post('/logout', [AuthController::class, 'DangXuat']);
    Route::get('/profile', [AuthController::class, 'Profile']);
});


