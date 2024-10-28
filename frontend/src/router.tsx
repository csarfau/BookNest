import { createBrowserRouter, Navigate } from "react-router-dom";
import Login from "./views/Login";
import SignUp from "./views/SignUp";
import Books from "./views/Books";
import NotFound from "./views/NotFound";
import DefaultLayout from "./components/DefaultLayout";
import GuestLayout from "./components/GuestLayout";
import Dashboard from "./views/Dashboard";
import BookForm from "./views/BookForm";
import BookShow from "./views/BookShow";

// Criação das rotas com o React Router Dom
const router = createBrowserRouter([
  {
    path: "/",
    element: <DefaultLayout />,
    children: [
      {
        path: "/",
        element: <Navigate to="/dashboard" />
      },
      {
        path: "/dashboard",
        element: <Dashboard />,
      },
      {
        path: "/books",
        element: <Books />,
      },
      {
        path: "/books/new",
        element: <BookForm key="bookCreate"/>,
      },
      {
        path: "/books/:id",
        element: <BookForm key="bookUpdate"/>,
      },
      {
        path: "/book/details/:id",
        element: <BookShow/>,
      },
    ],
  },
  {
    path: "/",
    element: <GuestLayout />,
    children: [
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/signup",
        element: <SignUp />,
      },
    ],
  },
  {
    path: "/*",
    element: <NotFound />,
  },
]);

export default router;
