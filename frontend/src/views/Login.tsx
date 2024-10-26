import { Link } from "react-router-dom";

export default function Login() {
  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  return (
    <div className="login-signup-form animated fadeInDown">
      <div className="form">
        <form onSubmit={onSubmit}>
          <h1 className="title">Acessar sua conta</h1>
          <input type="email" placeholder="Email" />
          <input type="password" placeholder="Senha" />
          <button className="btn btn-block">Entrar</button>
          <p className="message">
            Não possui uma conta? <Link to="/signup">Criar conta</Link>
          </p>
        </form>
      </div>
    </div>
  );
}
