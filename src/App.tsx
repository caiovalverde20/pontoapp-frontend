import React, { useState, useEffect } from "react";
import api from "./services/api";
import UserList from "./components/UserList";
import AddUser from "./components/AddUser";

import "./App.css";

const App: React.FC = () => {
  const [users, setUsers] = useState<any[]>([]);

  useEffect(() => {
    api.get("/users")
      .then((response) => setUsers(response.data))
      .catch((error) => console.error("Erro ao buscar usuários:", error));
  }, []);

  const handleUserAdded = (newUser: any) => {
    setUsers((prevUsers) => [...prevUsers, newUser]);
  };

  return (
    <div className="app-container">
      <header>
        <h1>PontoApp Frontend</h1>
      </header>

      <main>
        <UserList users={users} />
        <AddUser onUserAdded={handleUserAdded} />
      </main>
    </div>
  );
};

export default App;
