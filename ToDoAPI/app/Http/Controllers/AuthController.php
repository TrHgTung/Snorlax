<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Auth;
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

        // post User data
        $randInit = str_replace("-", "", (string)rand(1,9999).(string)Carbon::now()->toDateString());
        $user = User::create([
            'user_id' => 'user'.$randInit,
            'email' => $fields['email'],
            'display_name' => $fields['display_name'],
            'password' => bcrypt($fields['password']),
            'assist_id' => $fields['assist_id'],
        ]);
        $token = $user->createToken('myapptoken')->plainTextToken;
        $response = [
            'assist_id' => $fields['assist_id'],
            'user' => $user,
            'token' => $token, // token để authenticate tính năng dưới dạng Bearer Token (Postman)
        ];

        return response($response, 201);
    }

    public function DangNhap(Request $req){
        $fields = $req->validate([
            'email' => 'required|email',
            'password' => 'required|string',
        ]);
        
        // check User data
        $getUserByEmail = User::where('email', $fields['email'])->first(); 

        if(!$getUserByEmail || !Hash::check($fields['password'], $getUserByEmail->password)){
            return response([
                'message' => 'Sai thong tin dang nhap'
            ], 401);
        }
         
        $token = $getUserByEmail->createToken('myapptoken')->plainTextToken;
        $response = [
            'user' => $getUserByEmail,
            'token' => $token, // token để authenticate tính năng dưới dạng Bearer Token (Postman)
        ];

        return response($response, 201);
    }

    public function DangXuat(Request $req){
        auth()->user()->tokens()->delete();

        return [
            'message' => "Logged out",
        ];
    }

    public function Profile(){
        $userData = auth()->user();
        $userId = auth()->user()->user_id;

        return response()->json([
            //'status' => true,
            'message' => 'User info',
            'data' => $userData,
            'user_id' => $userId,
        ], 200);
    }
    
}
