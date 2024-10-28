<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Book;
use App\Http\Requests\StoreBookRequest;
use App\Http\Requests\UpdateBookRequest;
use App\Http\Resources\BookResource;
use Illuminate\Http\Request;

class BookController extends Controller
{
    /**
     * - Fazendo a busca de todos os livros, e realizando a filtragem pelo título
     * e também pela descrição, com o mesmo parâmetro de título, para facilitar
     * as buscas do usuário
     * - Ordenando pelo título e enviando com paginação para o frontend.
     * - Utilizando Resource personalizada para serializar os dados enviados
     */
    public function index(Request $request)
    {
        if ($request->has('title')) {
            return BookResource::collection(
                Book::where(function ($q) use ($request) {
                    $q->where('title', 'like', '%' . $request->input('title') . '%')
                        ->orWhere('description', 'like', '%' . $request->input('title') . '%');
                    })
                    ->orderBy('title', 'desc')
                    ->paginate(10)
            );
        }
        return BookResource::collection(
            Book::query()->orderBy('title', 'desc')->paginate(10)
        );
    }

    /**
     * - Fazendo uma busca apenas dos livros pertencentes ao usuário logado
     * - Também com filtro de título e descrição facilitando a busca do usuário
     * - Enviando com paginação e ordenado pelo título para o frontend
     * - Utilizando Resource personalizada para serializar os dados enviados
     */
    public function userBooks(Request $request)
    {
        if ($request->has('title')) {
            return BookResource::collection(
                Book::where('user_id', auth()->id())
                    ->where(function ($q) use ($request) {
                        $q->where('title', 'like', '%' . $request->input('title') . '%')
                            ->orWhere('description', 'like', '%' . $request->input('title') . '%');
                    })
                    ->orderBy('title', 'desc')
                    ->paginate(10)
            );
        }
        return BookResource::collection(
            Book::where('user_id', (auth()->id()))->orderBy('title', 'desc')->paginate(10)
        );
    }

    /**
     * - Validando os dados enviados pelo frontend com base na request personalizada
     * - Cria um novo registro atrelando o livro ao usuário que o criou
     */
    public function store(StoreBookRequest $request)
    {
        $this->authorize('create', Book::class);
        $data = $request->validated();
        $data['user_id'] = auth()->id();
        $book = Book::create($data);
        return response(new BookResource($book), 201);
    }

    /**
     * Recebe o livro pelo id, e retorna os dados desse livro, através
     * do implicit model bind do Laravel
     */
    public function show(Book $book)
    {
        return new BookResource($book);
    }

    /**
     * - Validando os dados enviados pelo frontend com base na request personalizada
     * - Atualiza o registro do livro com os novos dados
     */
    public function update(UpdateBookRequest $request, Book $book)
    {
        $this->authorize('update', $book);
        $data = $request->validated();
        $book->update($data);
        return response(new BookResource($book));
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Book $book)
    {
        $this->authorize('delete', $book);
        $book->delete();
        return response("", 204);
    }
}
