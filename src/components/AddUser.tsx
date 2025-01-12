import React, { useState } from 'react';
import api from '../services/api';
import {
  Input,
  Button,
  InputContainer,
  Label,
  Title,
  Highlight,
} from '../styles/LoginPage.styles';

interface AddUserProps {
  onUserAdded: (user: any) => void;
  onBackToLogin: () => void;
}

const AddUser: React.FC<AddUserProps> = ({ onUserAdded }) => {
  const [newUserName, setNewUserName] = useState<string>('');

  const handleAddUser = () => {
    api
      .post('/users', { fullName: newUserName })
      .then((response) => {
        onUserAdded(response.data);
        setNewUserName('');
      })
      .catch((error) => {
        console.error('Erro ao adicionar usuário:', error);
      });
  };

  return (
    <>
      <Title>
        Cadastro de <Highlight>Usuário</Highlight>
      </Title>
      <InputContainer>
        <Label>Nome Completo</Label>
        <Input
          type="text"
          value={newUserName}
          onChange={(e) => setNewUserName(e.target.value)}
          placeholder="Digite o nome completo"
        />
        <Button onClick={handleAddUser} disabled={!newUserName.trim()}>
          Cadastrar
        </Button>
      </InputContainer>
    </>
  );
};

export default AddUser;
