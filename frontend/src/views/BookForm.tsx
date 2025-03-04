import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { IBooks } from "../types/books";
import axiosClient from "../axios-client";
import { toast } from "react-toastify";

/** Função do componente BookForm:
 * - Exibir o formulário para criação ou edição de um livro
 * - Confirma a criação ou edição de um livro
 */

export default function BookForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState(null);
  const [book, setBook] = useState<IBooks>({
    id: "",
    title: "",
    description: "",
    author: "",
  });

  useEffect(() => {
    if (errors) {
      toast.error(`${errors}`, { theme: "dark", position: "top-center" });
    }
  }, [errors]);

  const fetchBook = (bookId: string) => {
    setLoading(true);
    axiosClient
      .get(`/books/${bookId}`)
      .then(({ data }) => {
        setBook(data);
      })
      .catch((error) => {
        console.error("Erro ao carregar livros:", error);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    if (id) {
      fetchBook(id);
    }
  }, [id]);

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if(book.id) {
      axiosClient.patch(`/books/${book.id}`, book)
        .then(() => {
          toast.success("Informações alteradas com sucesso!", {theme: "dark", position: "top-center"});
          navigate("/books");
        })
        .catch((err) => {
          const response = err.response;
          if (response && response.status === 422) {
            setErrors(response.data.errors);
          }
          setErrors(response.data.message)
        });
    } else {
      axiosClient.post("/books", book)
        .then(() => {
          toast.success("Livro criado com sucesso!", {theme: "dark", position: "top-center"});
          navigate("/books");
        })
        .catch((err) => {
          const response = err.response;
          if (response && response.status === 422) {
            setErrors(response.data.errors);
          }
          setErrors(response.data.message);
        })
    }
  };

  return (
    <>
      {!book.id ? <h1 style={{color: "#ffffff"}}>Novo Livro</h1> : <h1 style={{color: "#ffffff"}}>Editar Livro: {book.title}</h1>}
      <div className="card animated fadeInDown">
        {loading && <div className="text-center">Loading...</div>}
        <form onSubmit={onSubmit}>
          <label htmlFor="id">ID do Livro</label>
          {book.id && <input value={book.id} placeholder="ID" disabled />}
          <label htmlFor="title">Título</label>
          <input
            id="title"
            value={book.title}
            onChange={(e) => setBook({ ...book, title: e.target.value })}
            placeholder="Título"
          />
          <label htmlFor="description">Descrição</label>
          <input
            id="description"
            value={book.description}
            onChange={(e) => setBook({ ...book, description: e.target.value })}
            placeholder="Descrição"
          />
          <label htmlFor="author">Autor</label>
          <input
            id="author"
            value={book.author}
            onChange={(e) => setBook({ ...book, author: e.target.value })}
            placeholder="Autor"
          />
          <button className="btn">Salvar</button>
        </form>
      </div>
    </>
  );
}
