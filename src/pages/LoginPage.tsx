import React, { useState } from "react";
import api from "../services/api";
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

  const handleLogin = async () => {
    try {
      const response = await api.post("/login", { username });
      console.log("Login successful:", response.data);
    } catch (error) {
      console.error("Erro ao realizar login:", error);
    }
  };

  return (
    <Container>
      <Content>
        <Title>
          Ponto <Highlight>Ilumeo</Highlight>
        </Title>
        <InputContainer>
          <Label>Nome de usuário</Label>
          <Input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Digite seu nome de usuario"
          />
          <Button onClick={handleLogin}>Confirmar</Button>
        </InputContainer>
      </Content>
    </Container>
  );
};

export default LoginPage;
