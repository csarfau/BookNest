import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import axiosClient from "../axios-client";
import { useUser } from "../contexts/UserContext";
import { toast } from "react-toastify";
import { Box, Button, TextField, Typography } from "@mui/material";

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

  useEffect(() => {
    if (errors) {
      toast.error(`${errors}`, { theme: "dark", position: "top-center" });
    }
  }, [errors]);

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
        toast.success("Cadastro realizado com sucesso!", { theme: "dark" });
        setUser(data.user);
        setToken(data.token);
      })
      .catch((err) => {
        const response = err.response;
        if (response && response.status === 422) {
          setErrors(response.data.errors);
        }
        setErrors(response.data.message);
      });
  };

  return (
    <Box sx={{ height: "100vh", display: "flex", alignItems: "center" }}>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          padding: 3,
          borderRadius: 2,
          boxShadow: 3,
          maxWidth: 400,
          margin: "auto",
          animation: "fadeInDown 0.5s",
          background: "#ffffff",
        }}
      >
        <Typography variant="h4" component="h1" gutterBottom>
          Criar conta
        </Typography>
        <form onSubmit={onSubmit} style={{ width: "100%" }}>
          <TextField
            inputRef={nameRef}
            type="text"
            label="Nome completo"
            variant="outlined"
            fullWidth
            margin="normal"
            required
          />
          <TextField
            inputRef={emailRef}
            type="email"
            label="Email"
            variant="outlined"
            fullWidth
            margin="normal"
            required
          />
          <TextField
            inputRef={passwordRef}
            type="password"
            label="Senha"
            variant="outlined"
            fullWidth
            margin="normal"
            required
          />
          <TextField
            inputRef={passwordConfirmationRef}
            type="password"
            label="Confirme sua senha"
            variant="outlined"
            fullWidth
            margin="normal"
            required
          />
          <Button sx={{ marginTop: "1rem" }} variant="contained" color="primary" type="submit" fullWidth>
            Criar Conta
          </Button>
        </form>
        <Typography variant="body2" sx={{ marginTop: 2 }}>
          Já possui uma conta? <Link to="/signup">Fazer Login</Link>
        </Typography>
      </Box>
    </Box>
  );
}
