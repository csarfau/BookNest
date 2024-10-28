import { useEffect, useState } from "react";
import axiosClient from "../axios-client";
import BookDetails from "../components/BookDetails";
import { IBooks } from "../types/books";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";

export default function BookShow() {
  const [book, setBook] = useState<IBooks | null>(null);
  const { id } = useParams();

  useEffect(() => {
    if(id) {
      axiosClient.get(`/books/${id}`)
        .then(({ data }) => {
          setBook(data);
        })
        .catch(err => {
          toast.error(`Erro ao carregar o livro: ${err}`, { theme: "dark", position: "top-center" });
        });
    }
  }, [id]);

  if(book) {
    return <BookDetails book={book} />;
  }
};