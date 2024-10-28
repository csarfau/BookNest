<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UpdateBookRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * - Request criada para validar os dados de edição de um livro,
     * com regras e mensagens personalizadas para cada erro
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'title' => ['required', 'string', 'max:55'],
            'description' => ['required', 'string'],
            'author' => ['required', 'string', 'max:55'],
        ];
    }

    public function messages(): array
    {
        return [
            'title.required' => 'O título do livro é obrigatório.',
            'title.string' => 'O título do livro deve ser uma string válida.',
            'title.max' => 'O título do livro deve conter no máximo 55 caracteres.',
            'description.required' => 'A descrição do livro é obrigatória.',
            'description.string' => 'O título do livro deve ser uma string válida.',
            'author.required' => 'O autor do livro é obrigatório.',
            'author.string' => 'O autor do livro deve ser uma string válida.',
            'author.max' => 'O autor do livro deve conter no máximo 55 caracteres.',
        ];
    }
}
