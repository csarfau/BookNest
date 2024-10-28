import { useEffect, useState } from "react";
import axiosClient from "../axios-client";
import { IBooks } from "../types/books";

/** Função do componente Dashboard:
 * - Exibir todos os livros existentes
 * - Filtrar de acordo com o título
 */

export default function Dashboard() {
  const [books, setBooks] = useState<IBooks[] | []>([]);
  const [_, setLoading] = useState(false);

  // useEffect(() => {
  //   getAllBooks();
  // }, []);

  // const getAllBooks = () => {
  //   setLoading(true);
  //   axiosClient.get("/books")
  //     .then(({data}) => {
  //       setLoading(false);
  //       console.log(data);
  //     })
  //     .catch(() => {
  //       setLoading(false);
  //     })
  // }
  return (
    <div>
      Dashboard
    </div>
  );
}
