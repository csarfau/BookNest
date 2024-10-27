import { useEffect, useState } from "react";
import { IBooks } from "../types/books";
import axiosClient from "../axios-client";
import { Link } from "react-router-dom";

export default function Books() {
  const [books, setBooks] = useState<IBooks[] | []>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getBooks();
  }, []);

  const getBooks = () => {
    setLoading(true);
    axiosClient.get("/books")
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
        setLoading(false);
        getBooks();
      })
      .catch((err) => {
        setLoading(false);
        console.log(err);
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
