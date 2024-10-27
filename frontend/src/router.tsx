import { createBrowserRouter, Navigate } from "react-router-dom";
import Login from "./views/Login";
import SignUp from "./views/SignUp";
import Books from "./views/Books";
import NotFound from "./views/NotFound";
import DefaultLayout from "./components/DefaultLayout";
import GuestLayout from "./components/GuestLayout";
import Dashboard from "./views/Dashboard";
import BookForm from "./views/BookForm";

// Criação das rotas com o React Router Dom
const router = createBrowserRouter([
  {
    path: "/", // Grupo de rotas para usuários autenticados
    element: <DefaultLayout />,
    children: [
      {
        path: "/", // Rota para redirecionar 
        element: <Navigate to="/dashboard" />
      },
      {
        path: "/dashboard", // Rota listar todos os livros
        element: <Dashboard />,
      },
      {
        path: "/books", // Rota listar livros do usuário
        element: <Books />,
      },
      {
        path: "/books/new", // Rota novo livro
        element: <BookForm key="bookCreate"/>,
      },
      {
        path: "/books/:id", // Rota atualizar livro
        element: <BookForm key="bookUpdate"/>,
      },
    ],
  },
  {
    path: "/", // Grupo de rotas para usuários desconhecidos
    element: <GuestLayout />,
    children: [
      {
        path: "/login", // Rota de login
        element: <Login />,
      },
      {
        path: "/signup", // Rota de registro
        element: <SignUp />,
      },
    ],
  },
  {
    path: "/*", // Rota de não encontrado, para o caso de busca em rotas inexistentes
    element: <NotFound />,
  },
]);

export default router;
