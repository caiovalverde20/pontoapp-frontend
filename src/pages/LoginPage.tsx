import React, { useState } from "react";
import api from "../services/api";
import AddUser from "../components/AddUser";
import {
  Button,
  Container,
  Content,
  Input,
  InputContainer,
  Label,
  Title,
  Highlight,
} from "./LoginPage.styles";

const LoginPage: React.FC = () => {
  const [username, setUsername] = useState<string>("");
  const [isRegisterMode, setIsRegisterMode] = useState<boolean>(false);

  const handleLogin = async () => {
    try {
      const response = await api.post("/login", { username });
      console.log("Login successful:", response.data);
    } catch (error) {
      console.error("Erro ao realizar login:", error);
    }
  };

  const handleUserAdded = (newUser: any) => {
    alert(`Usuário cadastrado com sucesso! Username: ${newUser.username}`);
    setIsRegisterMode(false);
  };

  const handleBackToLogin = () => {
    setIsRegisterMode(false);
  };

  return (
    <Container>
      <Content>
        <Title>
          Ponto <Highlight>Ilumeo</Highlight>
        </Title>

        {isRegisterMode ? (
          <AddUser onUserAdded={handleUserAdded} onBackToLogin={handleBackToLogin} />
        ) : (
          <InputContainer>
            <Label>Nome de usuário</Label>
            <Input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Digite seu nome de usuário"
            />
            <Button onClick={handleLogin} >Entrar </Button>
          </InputContainer>
        )}

        <Button
          onClick={() => setIsRegisterMode(!isRegisterMode)}
          style={{
            marginTop: "1rem",
            backgroundColor: "#444",
            color: "#fff",
            maxWidth: "75%",
            alignSelf: "center",
          }}
        >
          {isRegisterMode ? "Voltar ao Login" : "Cadastrar"}
        </Button>
      </Content>
    </Container>
  );
};

export default LoginPage;
