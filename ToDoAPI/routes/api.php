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

// Route::post('/login', function (Request $request) {
//     $request->validate([
//         'email' => 'required|email',
//         'password' => 'required|string',
//     ]);

//     $user = User::where('email', $request->email)->first();

//     if (! $user || ! Hash::check($request->password, $user->password)) {
//         throw ValidationException::withMessages([
//             'email' => ['The provided credentials are incorrect.'],
//         ]);
//     }

//     $token = $user->createToken($request->email)->plainTextToken;

//     return response()->json(['token' => $token]);
// });

Route::middleware('auth:sanctum')->post('/logout', function (Request $request) {
    $request->user()->currentAccessToken()->delete();

    return response()->json(['message' => 'Logged out']);
});


// Test get Jobs
Route::middleware('auth:sanctum')->get('/jobs', function (Request $request) {
    return Jobs::all();
});

