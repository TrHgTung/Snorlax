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


/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

// authentication
Route::post('/register', [AuthController::class, 'DangKy']);
Route::post('/login', [AuthController::class, 'DangNhap']);
Route::middleware('auth:sanctum')->post('/logout', [AuthController::class, 'DangXuat']);

// Test get Jobs
Route::middleware('auth:sanctum')->get('/jobs', function (Request $request) {
    return Jobs::all();
});

