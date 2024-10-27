import { useEffect, useState } from "react";
import { IBooks } from "../types/books";
import axiosClient from "../axios-client";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

/** Função do componente Books:
 * - Listar os livros que pertencem a um usuário
 * - Filtrar de acordo com o título
 * - Criar, editar e deletar um livro
 */

export default function Books() {
  const [books, setBooks] = useState<IBooks[] | []>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getBooks();
  }, []);

  const getBooks = () => {
    setLoading(true);
    axiosClient.get("/userBooks")
      .then(({data}) => {
        setLoading(false);
        setBooks(data.data);
      })
      .catch(() => {
        setLoading(false);
      })
  }

  const onDelete = (bookId: string) => {
    setLoading(true);
    if(!window.confirm("Tem certeza que deseja excluir este livro?")) return;
    axiosClient.delete(`/books/${bookId}`)
      .then(() => {
        toast.success("Livro excluído com sucesso!", {theme: "dark"});
        setLoading(false);
        getBooks();
      })
      .catch((err) => {
        toast.error(`Não foi possível excluir o livro, erro: ${err.message}`, {theme: "dark"});
        setLoading(false);
      })
  }

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <h1>Meus Livros</h1>
        <Link to={"/books/new"} className="btn-add">Cadastrar livro</Link>
      </div>
      <div className="card animated fadeInDown">
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Título</th>
              <th>Descrição</th>
              <th>Autor</th>
              <th>Ações</th>
            </tr>
          </thead>
          {loading && <tbody>
            <tr>
              <td colSpan={5} className="text-center">
                Loading...
              </td>
            </tr>
          </tbody>}
          <tbody>
            {books.map(book => (
              <tr key={book.id}>
                <td>{book.id}</td>
                <td>{book.title}</td>
                <td>{book.description}</td>
                <td>{book.author}</td>
                <td>
                  <Link className="btn-edit" to={`/books/${book.id}`}>Editar</Link>
                  &nbsp;
                  <button onClick={() => onDelete(book.id)} className="btn-delete">Excluir</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
