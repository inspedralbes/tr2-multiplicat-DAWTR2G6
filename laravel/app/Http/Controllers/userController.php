<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\User;
use Illuminate\Support\Facades\Hash;

class UserController extends Controller
{
    public function register(Request $request)
    {
        $request->validate([
            'name' => 'required',
            'email' => 'required|email|unique:users',
            'password' => 'required'
        ]);

        $user = new User();
        $user->name = $request->name;
        $user->email = $request->email;
        $user->password = Hash::make($request->password);

        $user->save();

        $token = $user->createToken("auth_token")->plainTextToken;

        return response()->json([
            "status" => 1,
            "msg" => "Registro exitoso",
            "access_token" => $token,
        ]);
    }

    public function login(Request $request)
    {
        $request->validate([
            'email' => 'required|email',
            'password' => 'required'
        ]);

        $user = User::where("email", "=", $request->email)->first();

        if ($user && Hash::check($request->password, $user->password)) {
            $token = $user->createToken("auth_token")->plainTextToken;

            // Log the token for debugging
            info("Generated Token: " . $token);

            if ($token === null) {
                return response()->json([
                    "status" => 0,
                    "msg" => "No se pudo generar el token",
                ]);
            }

            return response()->json([
                "status" => 1,
                "tu_token" => $token,
                "msg" => "Usuario logeado exitosamente",
                "access_token" => $token
            ]);
        } else {
            return response()->json([
                "status" => 0,
                "msg" => "Credenciales inválidas",
            ], 401);
        }
    }

    public function userProfile()
    {
        return response()->json([
            "status" => 1,
            "msg" => "Perfil del usuario",
            "data" => auth()->user()
        ]);
    }

    public function logout()
    {
        if (auth()->check()) {
            auth()->user()->tokens()->delete();
            return response()->json([
                "status" => 1,
                "msg" => "Logout exitoso",
            ]);
        }

        return response()->json([
            "status" => 0,
            "msg" => "Usuario no autenticado",
        ], 401);
    }

    public function __construct()
    {
        $this->middleware('auth:sanctum')->only('userProfile');
    }
}
