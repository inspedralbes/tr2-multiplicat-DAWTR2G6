<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\User;
use Illuminate\Support\Facades\Hash;
use \Illuminate\Database\Eloquent\Relations\MorphMany;

class userController extends Controller
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

        return response()->json([
            "status" => 1,
            "msg" => "Registro exitoso",
        ]);
    }

    public function login(Request $request)
    {
        $request->validate([
            'email' => 'required|email',
            'password' => 'required'

        ]);
        $user = User::where("email", "=", $request->email)->first();

        if (isset($user->id)) {
            if (Hash::check($request->password, $user->password)) {
              
                $token = $user->createToken("auth_token", ['expires_in' => 100000])->plainTextToken;

                //si esta todo bien
                return response()->json([
                    "status" => 1,
                    "msg" => "Usuario logeado  exitosamente",
                    "access_token" => $token

                ]);
            } else {
                return response()->json([
                    "status" => 0,
                    "msg" => "La password es incorrecta",

                ], 404);
            }
        } else {
            return response()->json([
                "status" => 0,
                "msg" => "Usuario no registrado",
            ], 404);
        }
    }
    public function userProfile()
    {
        return response()->json([
            "status" => 0,
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
}
