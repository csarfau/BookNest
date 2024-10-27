<?php

namespace App\Policies;

use App\Models\Book;
use App\Models\User;

class BookPolicy
{
    /**
     * Determine whether the user can create models.
     */
    public function create(User $user)
    {
        if(!$user) return false;
        return true;
    }

    /**
     * Determine whether the user can update the model.
     */
    public function update(User $user, Book $book)
    {
        return $user->id === $book->user_id;
    }

    /**
     * Determine whether the user can delete the model.
     */
    public function delete(User $user, Book $book)
    {
        return $user->id === $book->user_id;
    }
}
