import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
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
  const [hasError, setHasError] = useState<boolean>(false);
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const response = await api.get(`/users/username/${username}`);
      if (response.data) {
        console.log("Login successful:", response.data);
        setHasError(false);
        navigate("/clockin"); 
      } else {
        setHasError(true);
      }
    } catch (error) {
      console.error("Erro ao realizar login:", error);
      setHasError(true);
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
              onChange={(e) => {
                setUsername(e.target.value);
                setHasError(false);
              }}
              placeholder="Digite seu nome de usuário"
              style={{
                borderColor: hasError ? "red" : "transparent", 
                borderWidth: hasError ? "2px" : "1px",
              }}
            />
            {hasError && (
              <span style={{ color: "red", fontSize: "0.9rem", marginTop: "0.5rem" }}>
                Usuário não encontrado. Tente novamente.
              </span>
            )}
            <Button onClick={handleLogin}>Entrar</Button>
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
