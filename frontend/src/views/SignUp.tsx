import { useRef, useState } from "react";
import { Link } from "react-router-dom";
import axiosClient from "../axios-client";
import { useUser } from "../contexts/UserContext";
import { toast } from "react-toastify";

  /** Função do componente Signup:
   * - Cria o payload com as informações preenchidas
   * - Requisição HTTP para o backend com axios
   * - Salva o user no context
   * - Salva o token recebido no localStorage
   * - Faz o tratamentos dos erros do servidor e também dos erros de validação
   * de formulário, e exibe pro usuário
   * */

export default function SignUp() {
  const nameRef = useRef<HTMLInputElement | null>(null);
  const emailRef = useRef<HTMLInputElement | null>(null);
  const passwordRef = useRef<HTMLInputElement | null>(null);
  const passwordConfirmationRef = useRef<HTMLInputElement | null>(null);
  const [errors, setErrors] = useState(null);
  const { setUser, setToken } = useUser();

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const payload = {
      name: nameRef?.current?.value,
      email: emailRef?.current?.value,
      password: passwordRef?.current?.value,
      password_confirmation: passwordConfirmationRef?.current?.value,
    };

    axiosClient
      .post("/signup", payload)
      .then(({ data }) => {
        toast.success("Cadastro realizado com sucesso!", {theme: "dark"});
        setUser(data.user);
        setToken(data.token);
      })
      .catch((err) => {
        const response = err.response;
        if (response && response.status === 422) {
          setErrors(response.data.errors);
        }
      });
  };

  return (
    <div className="login-signup-form animated fadeInDown">
      <div className="form">
        <form onSubmit={onSubmit}>
          <h1 className="title">Crie sua conta gratuita</h1>
          {errors && (
            <div className="alert">
              {Object.keys(errors).map((key) => (
                <p key={key}>{errors[key][0]}</p>
              ))}
            </div>
          )}
          <input ref={nameRef} placeholder="Nome completo" />
          <input ref={emailRef} type="email" placeholder="Email" />
          <input ref={passwordRef} type="password" placeholder="Senha" />
          <input
            ref={passwordConfirmationRef}
            type="password"
            placeholder="Confirme sua senha"
          />
          <button className="btn btn-block">Criar conta</button>
          <p className="message">
            Já tem uma conta? <Link to="/login">Fazer login</Link>
          </p>
        </form>
      </div>
    </div>
  );
}
