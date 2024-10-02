import { Box, Center, Input } from "@chakra-ui/react";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../components/AppContext";
import { Card } from "../components/Card";
import DButton from "../components/DButton";
import { login } from "../services/login";
import { changeLocalStorage } from "../services/storage";

const Home = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const { setIsLoggedIn } = useContext(AppContext);
  const navigate = useNavigate();

  const validateUser = async (email: string, password: string) => {
    console.log("Tentando logar com", email, password); // Log para debug
    const loggedIn = await login(email, password);

    if (!loggedIn) {
      console.log("Email ou senha invalidos");
      return alert("Email ou senha inválidos");
    } else {
      console.log("Usuario logado com sucesso");
    }

    setIsLoggedIn(true);
    changeLocalStorage({ login: true });
    navigate("/conta/1");
  };

  // Validação simples dos campos antes de tentar o login
  const handleLogin = () => {
    if (email.trim() === "" || password.trim() === "") {
      alert("Por favor, preencha ambos os campos.");
      setEmail("");
      setPassword("");
      return;
    }
    validateUser(email, password);
  };

  return (
      <Box padding="25px">
        <Card>
          <Center>
            <h1>Faça o login</h1>
          </Center>
          <Input
            placeholder="Email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            type="email"
          />
          <Input
            placeholder="Senha"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            type="password" // Tipo de input de senha
          />
          <Center>
            <DButton onClick={handleLogin} />
          </Center>
        </Card>
      </Box>
  );
};

export default Home;
