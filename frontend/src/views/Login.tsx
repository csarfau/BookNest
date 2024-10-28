import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import axiosClient from "../axios-client";
import { useUser } from "../contexts/UserContext";
import { toast } from "react-toastify";
import { Box, Button, TextField, Typography } from "@mui/material";

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

  useEffect(() => {
    if (errors) {
      toast.error(`${errors}`, { theme: "dark", position: "top-center" });
    }
  }, [errors]);

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
          }
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
          Acesse sua conta
        </Typography>
        <form onSubmit={onSubmit} style={{ width: "100%" }}>
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
          <Button variant="contained" color="primary" type="submit" fullWidth>
            Entrar
          </Button>
        </form>
        <Typography variant="body2" sx={{ marginTop: 2 }}>
          Não possui uma conta? <Link to="/signup">Criar conta</Link>
        </Typography>
      </Box>
    </Box>
  );
}
