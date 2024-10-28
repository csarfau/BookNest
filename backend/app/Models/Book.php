<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Str;

class Book extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'title',
        'description',
        'author',
        'user_id'
    ];

    public $incrementing = false;
    protected $keyType = 'string';

    /**
     * Função para criar um valor padrão para o uuid na model Book
     */
    protected static function boot()
    {
        parent::boot();

        static::creating(function ($model) {
            if (empty($model->id)) {
                $model->id = (string) Str::uuid();
            }
        });
    }

    /**
     * Criando o relacionamento com user, um livro pertence a um único usuário
     */
    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
