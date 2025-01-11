import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import api from "../services/api";
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
  const location = useLocation();
  const navigate = useNavigate();
  const username = location.state?.username;

  const [timeToday, setTimeToday] = useState<string>("0h 00m");
  const [elapsedTime, setElapsedTime] = useState<number>(0);
  const [history, setHistory] = useState<{ date: string; hours: string }[]>([]);
  const [isClockedIn, setIsClockedIn] = useState<boolean>(false);

  useEffect(() => {
    if (!username) {
      navigate("/");
      return;
    }

    const fetchHistory = async () => {
      try {
        const response = await api.get(`/ponto/user/${username}`);
        const data = response.data;

        if (data.length === 0) {
          setHistory([]);
          setTimeToday("0h 00m");
          setIsClockedIn(false);
          return;
        }

        setHistory(
          data.map((ponto: any) => ({
            date: new Date(ponto.startTime).toLocaleDateString(),
            hours: ponto.endTime
              ? calculateHours(ponto.startTime, ponto.endTime)
              : "Aberto",
          }))
        );

        const todayPonto = data.find(
          (ponto: any) =>
            new Date(ponto.startTime).toDateString() ===
            new Date().toDateString()
        );

        if (todayPonto) {
          if (!todayPonto.endTime) {
            const startTime = new Date(todayPonto.startTime).getTime();
            const now = Date.now();
            setElapsedTime(Math.floor((now - startTime) / 1000));
            setIsClockedIn(true);
          } else {
            setTimeToday(
              calculateHours(todayPonto.startTime, todayPonto.endTime)
            );
          }
        }
      } catch (error) {
        console.error("Erro ao buscar histórico de pontos:", error);
        alert("Erro ao carregar os pontos. Tente novamente.");
      }
    };

    fetchHistory();
  }, [username, navigate]);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isClockedIn) {
      timer = setInterval(() => {
        setElapsedTime((prev) => prev + 1);
        setTimeToday(formatTime(elapsedTime + 1));
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [isClockedIn, elapsedTime]);

  const calculateHours = (start: string, end: string): string => {
    const diff = new Date(end).getTime() - new Date(start).getTime();
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    return `${hours}h ${minutes}m`;
  };

  const formatTime = (totalSeconds: number): string => {
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;
    return `${hours}h ${minutes}m ${seconds}s`;
  };

  const handleClockInOut = async () => {
    try {
      if (isClockedIn) {
        await api.patch(`/ponto/end/${username}`);
        alert("Ponto finalizado com sucesso!");
        setIsClockedIn(false);
        setElapsedTime(0);
      } else {
        await api.post(`/ponto/start/${username}`);
        alert("Ponto iniciado com sucesso!");
        setIsClockedIn(true);
      }

      const response = await api.get(`/ponto/user/${username}`);
      setHistory(
        response.data.map((ponto: any) => ({
          date: new Date(ponto.startTime).toLocaleDateString(),
          hours: ponto.endTime
            ? calculateHours(ponto.startTime, ponto.endTime)
            : "Aberto",
        }))
      );
    } catch (error) {
      console.error("Erro ao registrar ponto:", error);
      alert("Erro ao registrar ponto. Tente novamente.");
    }
  };

  return (
    <Container>
      <Content>
        <Title>
          Relógio de <Highlight>Ponto</Highlight>
        </Title>
        <InputContainer>
          <Label>{timeToday}</Label>
          <p style={{ color: "#CFCFCF" }}>Horas de hoje</p>
          <Button
            onClick={handleClockInOut}
            style={{
              backgroundColor: isClockedIn ? "#e63946" : "#fe8a00",
              transform: isClockedIn ? "scale(1.05)" : "scale(1)",
              transition: "all 0.2s ease",
            }}
          >
            {isClockedIn ? "Finalizar Ponto" : "Iniciar Ponto"}
          </Button>
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
