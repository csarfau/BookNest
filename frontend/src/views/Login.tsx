import { useRef, useState } from "react";
import { Link } from "react-router-dom";
import axiosClient from "../axios-client";
import { useUser } from "../contexts/UserContext";
import { toast } from "react-toastify";

  /** Função do componente Login:
   * - Cria o payload com as informações preenchidas
   * - Requisição HTTP para o backend com axios
   * - Salva o user no context
   * - Salva o token recebido no localStorage
   * - Faz o tratamentos dos erros do servidor e também dos erros de validação
   * de formulário, e exibe pro usuário
   * */

export default function Login() {
  const emailRef = useRef<HTMLInputElement | null>(null);
  const passwordRef = useRef<HTMLInputElement | null>(null);
  const [errors, setErrors] = useState(null);
  const { setUser, setToken } = useUser();

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrors(null);

    const payload = {
      email: emailRef?.current?.value,
      password: passwordRef?.current?.value,
    };
    axiosClient
      .post("/login", payload)
      .then(({ data }) => {
        setUser(data.user);
        setToken(data.token);
      })
      .catch((err) => {
        const response = err.response;
        if (response && response.status === 422) {
          if (response.data.errors) {
            setErrors(response.data.errors);
          } else {
            toast.error("Falha ao fazer login!", {theme: "dark"});
            setErrors(response.data.message);
          }
        }
        toast.error("Falha ao fazer login!", {theme: "dark"});
        setErrors(response.data.message);
      });
  };

  return (
    <div className="login-signup-form animated fadeInDown">
      <div className="form">
        <form onSubmit={onSubmit}>
          <h1 className="title">Acessar sua conta</h1>
          {errors && (
            <div className="alert">
              {typeof errors === "object" ? (
                Object.keys(errors).map((key) => (
                  <p key={key}>{errors[key][0]}</p>
                ))
              ) : (
                <p>{errors}</p>
              )}
            </div>
          )}
          <input ref={emailRef} type="email" placeholder="Email" />
          <input ref={passwordRef} type="password" placeholder="Senha" />
          <button className="btn btn-block">Entrar</button>
          <p className="message">
            Não possui uma conta? <Link to="/signup">Criar conta</Link>
          </p>
        </form>
      </div>
    </div>
  );
}
