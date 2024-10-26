import { Link } from "react-router-dom";

export default function SignUp() {

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  }

  return (
    <div className="login-signup-form animated fadeInDown">
    <div className="form">
      <form onSubmit={onSubmit}>
        <h1 className="title">Crie sua conta gratuita</h1>
        <input placeholder="Nome completo"/>
        <input type="email" placeholder="Email"/>
        <input type="password" placeholder="Senha"/>
        <input type="password_confirmation" placeholder="Confirme sua senha"/>
        <button className="btn btn-block">Criar conta</button>
        <p className="message">
          Já tem uma conta? <Link to="/login">Fazer login</Link>
        </p>
      </form>
    </div>
  </div>
  );
}
