<?php

namespace App\Policies;

use App\Models\Book;
use App\Models\User;

/**
 * Policies para criar autorização, essas regras estão sendo usadas dentro
 * dos controllers para autorizar cada uma das ações (create, update, delete),
 * para que apenas o usuário dono do livro consiga editá-lo ou apagá-lo, e
 * apenas um usuário logado consiga criar um novo livro.
 */
class BookPolicy
{
    public function create(User $user)
    {
        if(!$user) return false;
        return true;
    }

    public function update(User $user, Book $book)
    {
        return $user->id === $book->user_id;
    }

    public function delete(User $user, Book $book)
    {
        return $user->id === $book->user_id;
    }
}
