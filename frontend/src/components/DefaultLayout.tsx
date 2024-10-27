import { Link, Navigate, Outlet } from "react-router-dom";
import { useUser } from "../contexts/UserContext";
import { useEffect } from "react";
import axiosClient from "../axios-client";
import { toast } from "react-toastify";

export default function DefaultLayout() {
  const { user, token, setUser, setToken } = useUser();

  if (!token) {
    return <Navigate to="/login" />;
  }

  // onLogout: Remove o token de autenticação  
  const onLogout = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    axiosClient.post("/logout")
      .then(() => {
        setUser(null),
        setToken(null)
      })
      .catch(err => {
        toast.error(`Falha ao sair: ${err}`, {theme: "dark"});
      })
  };

  // UseEffect para preencher os dados iniciais do usuário ao entrar
  useEffect(() => {
    axiosClient.get("/user").then(({ data }) => {
      setUser(data);
    });
  }, []);

  return (
    <div id="defaultLayout">
      <aside>
        <Link to="/dashboard">Painel</Link>
        <Link to="/books">Meus Livros</Link>
      </aside>
      <div className="content">
        <header>
          <div>Book Nest</div>
          <div>
            {user?.name}
            <a href="#" onClick={onLogout} className="btn-logout">
              Sair
            </a>
          </div>
        </header>
        <main>
          <Outlet />
        </main>
      </div>
    </div>
  );
}
