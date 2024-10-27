<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\LoginRequest;
use App\Http\Requests\SignupRequest;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class AuthController extends Controller
{
    /** Função de registro:
     * - Verifica os dados com base na request personalizada;
     * - Declaração explicita que $user é uma instância do model User;
     * - Salva o novo usuário no banco com a senha hasheada, maior segurança;
     * - Cria o token, que será usado para autenticação;
     * - Envia user e token na response, como o esperado pelo frontend.
     */
    public function signup(SignupRequest $request)
    {
        $data = $request->validated();
        /** @var User $user */
        $user = User::create([
            'name' => $data['name'],
            'email' => $data['email'],
            'password' => bcrypt($data['password']),
        ]);
        $token = $user->createToken('main')->plainTextToken;
        return response(compact('user', 'token'), 201);
    }

    /** Função de login:
     * - Verifica os dados com base na request personalizada;
     * - Declaração explicita que $user é uma instância do model User;
     * - Em caso de credenciais inválidas, retorna mensagem de erro;
     * - Caso estejam corretas, autentica o usuário
     * - Envia user e token na response, como o esperado pelo frontend.
     */
    public function login(LoginRequest $request)
    {
        $credentials = $request->validated();
        logger(json_encode($credentials, JSON_PRETTY_PRINT));
        logger(json_encode(Auth::attempt($credentials), JSON_PRETTY_PRINT));
        if (!Auth::attempt($credentials)) {
            return response ([
                'message' => 'E-mail ou senha incorretos'
            ], 401);
        };
        /** @var User $user */
        $user = Auth::user();
        $token = $user->createToken('main')->plainTextToken;

        return response(compact('user', 'token'), 200);
    }

    /** Função de logout:
     * - Apenas apaga todos os tokens existentes deste usuário.
     */
    public function logout(Request $request)
    {
        $token = $request->bearerToken();
        $accessToken = \Laravel\Sanctum\PersonalAccessToken::findToken($token);

        if ($accessToken) {
            $accessToken->delete();
            return response('', 204);
        }

        return response()->json(['message' => 'Invalid token'], 401);
    }
}
