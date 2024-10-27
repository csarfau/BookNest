import { Link, Navigate, Outlet } from "react-router-dom";
import { useUser } from "../contexts/UserContext";
import { useEffect } from "react";
import axiosClient from "../axios-client";

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
        // TODO Toast
        console.log(err);
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
        <Link to="/books">Livros</Link>
      </aside>
      <div className="content">
        <header>
          <div>Header</div>
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
