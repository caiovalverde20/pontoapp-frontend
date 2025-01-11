import React, { useState } from "react";
import api from "../services/api";

interface AddUserProps {
  onUserAdded: (user: any) => void;
}

const AddUser: React.FC<AddUserProps> = ({ onUserAdded }) => {
  const [newUserName, setNewUserName] = useState<string>("");

  const handleAddUser = () => {
    api.post("/users", { fullName: newUserName })
      .then((response) => {
        onUserAdded(response.data);
        setNewUserName("");
      })
      .catch((error) => {
        console.error("Erro ao adicionar usuário:", error);
      });
  };

  return (
    <div>
      <h2>Adicionar Novo Usuário</h2>
      <input
        type="text"
        value={newUserName}
        onChange={(e) => setNewUserName(e.target.value)}
        placeholder="Nome completo"
      />
      <button onClick={handleAddUser} disabled={!newUserName.trim()}>
        Adicionar
      </button>
    </div>
  );
};

export default AddUser;
