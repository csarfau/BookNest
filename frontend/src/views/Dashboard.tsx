import { useEffect, useState } from "react";
import axiosClient from "../axios-client";
import { IBooks } from "../types/books";
import { Box, Card } from "@mui/material";
import BookCard from "../components/BookCard";
import { useNavigate } from "react-router-dom";

/** Função do componente Dashboard:
 * - Exibir todos os livros existentes
 * - Filtrar de acordo com o título
 */

export default function Dashboard() {
  const [books, setBooks] = useState<IBooks[] | []>([]);
  const [_, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    getAllBooks();
  }, []);

  const getAllBooks = () => {
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
    const handleViewDetails = (id: string) => {
      navigate(`/book/details/${id}`);
    }
  
    return (
      <Box 
        sx={{ 
          display: "flex", 
          flexWrap: "wrap", 
          justifyContent: "space-between", 
          padding: "16px",
        }}
      >
        {books.map((book) => (
          <Card key={book.id}
            sx={{
              flex: "0 1 calc(25% - 16px)", 
              margin: "8px",
              display: "flex",
              flexDirection: "column",
            }}
          >
            <BookCard book={book} onViewDetails={handleViewDetails}/>
          </Card>
        ))}
      </Box>
    );
}