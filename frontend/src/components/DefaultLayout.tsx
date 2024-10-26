import { Link, Navigate, Outlet } from "react-router-dom";
import { useUser } from "../contexts/UserContext";

export default function DefaultLayout() {
  const { user, token } = useUser();

  if(!token) {
    return <Navigate to="/login" />
  }

  const onLogout = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
  }

  return (
    <div id="defaultLayout">
      <aside>
        <Link to="/dashboard">Painel</Link>
        <Link to="/books">Livros</Link>
      </aside>
      <div className="content">
        <header>
          <div>
            Header
          </div>
          <div>
            {user?.name}
            <a href="#" onClick={onLogout} className="btn-logout">Sair</a>
          </div>
        </header>
        <main>
          <Outlet />
        </main>
      </div>
    </div>
  );
}
