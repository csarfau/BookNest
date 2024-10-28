<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rules\Password;

class SignupRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return "true";
    }

    /**
     * - Request criada para validar os dados de registro de usuário,
     * com regras e mensagens personalizadas para cada erro
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'name' => ['required', 'string', 'max:55'],
            'email' => ['required', 'email', 'unique:users,email'],
            'password' => [
                'required',
                'confirmed',
                Password::min(8)
                    ->letters()
                    ->symbols()
            ]
        ];
    }

    public function messages(): array
    {
        return [
            'name.required' => 'O nome é obrigatório.',
            'name.string' => 'O nome deve ser uma string válida.',
            'name.max' => 'O nome não pode conter mais do que 55 caracteres.',
            'email.required' => 'O e-mail é obrigatório',
            'email.email' => 'Insira um e-mail válido.',
            'email.unique' => 'Esse e-mail já existe.',
            'password.required' => 'A senha é obrigatória.',
            'password.confirmed' => 'As senhas não conferem.',
            'password.min' => 'A senha deve conter pelo menos 8 caracteres.',
            'password.letters' => 'A senha deve conter pelo menos 1 letra.',
            'password.symbols' => 'A senha deve conter pelo menos 1 símbolo.',
        ];
    }
}
