<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;

class AuthController extends Controller
{
    public function login(Request $request)
    {
        $credentials = Validator::make($request->all(), [
            'username' => 'required|alpha',
            'password' => 'required',
        ]);

        if ($credentials->fails()) {
            return response()->json([
                'status' => false,
                'message' => 'Invalid credentials',
                'errors' => $credentials->errors()->all(),
            ], 401);
        } else {
            if (Auth::attempt(['name' => $request->username, 'password' => $request->password])) {
                $user = $request->user();
                return response()->json([
                    'status' => true,
                    'message' => 'Logged in successfully!',
                    'token' => $user->createToken('API Token')->plainTextToken,
                    'token_type' => 'bearer',
                ], 200);
            } else {
                return response()->json([
                    'status' => false,
                    'message' => 'Credentials cannot match,try again!',
                ], 401);
            }
        }
    }

    public function signup(Request $request)
    {
        $credentials = Validator::make($request->all(), [
            'name' => 'required',
            'password' => 'required',
            'email' => 'required|unique:users,email',
        ]);

        if ($credentials->fails()) {
            return response()->json([
                'status' => false,
                'message' => 'Invalid credentials',
                'errors' => $credentials->errors()->all(),
                'data' => $request->all(),
            ], 401);
        } else {
            $user = User::create([
                'name' => $request->username,
                'email' => $request->email,
                'password' => bcrypt($request->password),
            ]);

            if ($user) {
                return response()->json([
                    'status' => true,
                    'message' => "sign up successful!",
                ]);
            } else {
                return response()->json([
                    'status' => false,
                    'message' => "Sign up failed!",
                ], 403);
            }
        }
    }
    public function logout(Request $request)
    {
        $user = Auth::user();
        $user->tokens()->delete();
        return response()->json([
            'status' => true,
            'message' => 'Logged Out Successful!',
            'user' => $user,
        ]);
    }
}
