import React, { useState } from "react";
import {
  Container,
  Content,
  Title,
  Highlight,
  Button,
  InputContainer,
  Label,
} from "./LoginPage.styles";

const ClockInPage: React.FC = () => {
  const [timeToday, setTimeToday] = useState<string>("0h 00m");
  const [history, setHistory] = useState([
    { date: "03/11/23", hours: "7h 30m" },
    { date: "04/11/23", hours: "7h 30m" },
    { date: "05/11/23", hours: "7h 30m" },
    { date: "06/11/23", hours: "7h 30m" },
    { date: "09/11/23", hours: "7h 30m" },
    { date: "22/11/23", hours: "7h 30m" },
    { date: "24/11/23", hours: "7h 30m" },
    { date: "25/11/23", hours: "7h 30m" },
    { date: "24/12/23", hours: "7h 30m" },
    { date: "25/12/23", hours: "7h 30m" },
  ]);

  const handleClockIn = () => {
    alert("Hora de entrada registrada!");
  };

  return (
    <Container>
      <Content>
        <Title>
          Relógio de <Highlight>Ponto</Highlight>
        </Title>
        <InputContainer>
          <Label>{timeToday}</Label>
          <p>Horas de hoje</p>
          <Button onClick={handleClockIn}>Hora de entrada</Button>
        </InputContainer>
        <h2 style={{ marginTop: "2rem", color: "#F5F5F5" }}>Dias anteriores</h2>
        <div style={{ width: "100%", maxWidth: "400px" }}>
          {history.map((entry, index) => (
            <div
              key={index}
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                backgroundColor: "rgba(217, 217, 217, 0.05)",
                borderRadius: "4px",
                padding: "0.5rem 1rem",
                marginBottom: "0.5rem",
              }}
            >
              <span style={{ color: "#CFCFCF" }}>{entry.date}</span>
              <span style={{ color: "#F5F5F5", fontWeight: 700 }}>
                {entry.hours}
              </span>
            </div>
          ))}
        </div>
      </Content>
    </Container>
  );
};

export default ClockInPage;
