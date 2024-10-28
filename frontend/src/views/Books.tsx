import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TablePagination,
  Button,
  CircularProgress,
  Typography,
  TextField,
} from "@mui/material";
import { useEffect, useState, useCallback } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import axiosClient from "../axios-client";
import { useDebounce } from "../customHooks/debounceHook";

interface IBooks {
  id: string;
  title: string;
  description: string;
  author: string;
}

interface PaginationMeta {
  current_page: number;
  from: number;
  last_page: number;
  per_page: number;
  total: number;
}

interface ApiResponse {
  data: IBooks[];
  meta: PaginationMeta;
}

/** Aqui está toda a lógica de paginação, feita com o TablePagination do MUI:
 * - Função fetchBooks, usa o hook useCallback para buscar os livros do usuário
 * passando como parâmetro a página atual e a quantidade por página selecionada
 * que será utilizada para construir a paginação.
 * - Função handleDelete, faz a deleção de um livro
 * - Função handleChangePage, é chamada sempre que a página atual se altera,
 * e grava qual a nova página atual
 * - Função handleChangeRowsPerPage, é chamada sempre que alterar a quantidade de 
 * resultados por página, grava esse valor e retorna a página para 0 (default)
 * - Editar, adicionar e visualizar um livro, são chamadas outras pages
 */

export default function Books() {
  const [books, setBooks] = useState<IBooks[]>([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(0);
  const [total, setTotal] = useState(0);
  const [rowsPerPage, _] = useState(10);
  const [searchValue, setSearchValue] = useState('');
  const debouncedSearch = useDebounce(searchValue);

  const fetchBooks = useCallback((currentPage: number, pageSize: number) => {
    setLoading(true);
    axiosClient
      .get<ApiResponse>("/userBooks", {
        params: {
          page: currentPage + 1,
          per_page: pageSize,
          title: debouncedSearch
        },
      })
      .then(({ data }) => {
        setBooks(data.data);
        setTotal(data.meta.total);
      })
      .catch((error) => {
        toast.error(`Falha ao buscar livros: ${error.message}`, {
          theme: "dark",
        });
      })
      .finally(() => {
        setLoading(false);
      });
  }, [debouncedSearch]);

  useEffect(() => {
    fetchBooks(page, rowsPerPage);    
  }, [page, rowsPerPage, fetchBooks, debouncedSearch]);

  const handleDelete = (bookId: string) => {
    if (!window.confirm("Tem certeza que deseja excluir este livro?")) {
      return;
    }
    setLoading(true);

    axiosClient
      .delete(`/books/${bookId}`)
      .then(() => {
        toast.success("Livro excluído com sucesso!", { theme: "dark" });
        fetchBooks(page, rowsPerPage);
      })
      .catch((error) => {
        toast.error(`Não foi possível excluir o livro: ${error.message}`, {
          theme: "dark",
        });
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const handleChangePage = useCallback(
    (_e: React.MouseEvent<HTMLButtonElement> | null, newPage: number) => {
      setPage(newPage);
    },
    []
  );

  return (
    <Paper elevation={3} sx={{ maxHeight: "90vh" }}>
      <Paper elevation={2} sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: 2 }}>
        <Typography>
          Livros
        </Typography>
        <TextField 
            size="small" 
            id="outlined-basic" 
            label="Pesquisar" 
            variant="outlined" 
            onChange={(e) => setSearchValue(e.target.value)}
          />
        <Button
          component={Link}
          to={`/books/new`}
          variant="contained"
          color="primary"
          size="small"
        >
          Adicionar Livro
        </Button>
      </Paper>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell sx={{ textAlign: "center" }}>ID</TableCell>
              <TableCell sx={{ textAlign: "center" }}>Título</TableCell>
              <TableCell sx={{ textAlign: "center" }}>Descrição</TableCell>
              <TableCell sx={{ textAlign: "center" }}>Autor</TableCell>
              <TableCell sx={{ textAlign: "center" }}>Ações</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {loading ? (
              <TableRow>
                <TableCell colSpan={5} align="center">
                  <CircularProgress size={24} />
                </TableCell>
              </TableRow>
            ) : books.length === 0 ? (
              <TableRow>
                <TableCell colSpan={5} align="center">
                  Nenhum livro encontrado
                </TableCell>
              </TableRow>
            ) : (
              books.map((book) => (
                <TableRow key={book.id}>
                  <TableCell
                    sx={{
                      maxWidth: 150,
                      whiteSpace: "nowrap",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      textAlign: "center",
                    }}
                  >
                    {book.id.slice(0, 4)}...{book.id.slice(-4)}
                  </TableCell>
                  <TableCell sx={{ textAlign: "center" }}>
                    {book.title}
                  </TableCell>
                  <TableCell
                    sx={{
                      maxWidth: 500,
                      whiteSpace: "nowrap",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                    }}
                  >
                    {book.description}
                  </TableCell>
                  <TableCell sx={{ textAlign: "center" }}>
                    {book.author}
                  </TableCell>
                  <TableCell sx={{ textAlign: "center" }}>
                    <Button
                      component={Link}
                      to={`/books/${book.id}`}
                      variant="contained"
                      color="primary"
                      size="small"
                    >
                      Editar
                    </Button>
                    &nbsp;
                    <Button
                      onClick={() => handleDelete(book.id)}
                      variant="contained"
                      color="error"
                      size="small"
                    >
                      Excluir
                    </Button>
                    &nbsp;
                    <Button
                      component={Link}
                      to={`/book/details/${book.id}`}
                      variant="contained"
                      size="small"
                      sx={{ background: "#66bb6a" }}
                    >
                      Detalhes
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        component="div"
        count={total}
        page={page}
        rowsPerPage={rowsPerPage}
        rowsPerPageOptions={[]} 
        onPageChange={handleChangePage}
        labelDisplayedRows={({ from, to, count }) =>
          `${from}-${to} de ${count}`
        }
      />
    </Paper>
  );
}
