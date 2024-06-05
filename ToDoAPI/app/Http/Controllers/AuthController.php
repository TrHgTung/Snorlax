<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Hash;
use App\Models\User;
use Carbon\Carbon;

class AuthController extends Controller
{
    public function DangKy(Request $req){
        $fields = $req->validate([
            'email' => 'required|email',
            'display_name' => 'required|string',
            'password' => 'required|string',
        ]);
        $randInit = str_replace("-", "", (string)rand(1,9999).(string)Carbon::now()->toDateString());
        $user = User::create([
            'user_id' => 'user'.$randInit,
            'email' => $fields['email'],
            'display_name' => $fields['display_name'],
            'password' => bcrypt($fields['password']),
        ]);
        $token = $user->createToken('myapptoken')->plainTextToken;
        $response = [
            'user' => $user,
            'token' => $token, // token để authenticate tính năng dưới dạng Bearer Token (Postman)
        ];

        return response($response, 201);
    }
}
