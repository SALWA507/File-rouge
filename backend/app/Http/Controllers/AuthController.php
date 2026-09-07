<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
class AuthController extends Controller
{
    public function login(Request $request){
        $credentials = $request->validate([
            'email'=>['required','email'],
            'password'=>['required'],
        ]);
        if(Auth::attempt($credentials,$request->remember)){
            $request->session()->regenerate();
            return response()->json([
                'message'=> 'connexion reussie',
                'user'=>Auth::user()

            ],200);
        }
        return response()->json([
            'message'=>'les identifiants sont incorrects'
        ],422);
    }
    public function logout(Request $request){
        Auth::logout();
        $request->session()->invalidate();
        $request->session()->regenerateToken();
        return response()->json(['message' => 'Deconnexion reussie']);
    }
}
