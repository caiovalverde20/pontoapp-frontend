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

interface WeekEntry {
  day: string;
  hours: string;
  isToday: boolean;
  meetsTarget: boolean;
}

const ClockInPage: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const username = location.state?.username;

  const [timeToday, setTimeToday] = useState<string>("0h 00m");
  const [elapsedTime, setElapsedTime] = useState<number>(0);
  const [weekData, setWeekData] = useState<WeekEntry[]>([]);
  const [totalHoursWeek, setTotalHoursWeek] = useState<string>("0h 00m");
  const [isClockedIn, setIsClockedIn] = useState<boolean>(false);
  const [isClockedOut, setIsClockedOut] = useState<boolean>(false);

  useEffect(() => {
    if (!username) {
      navigate("/");
      return;
    }

    const fetchWeekData = async () => {
      try {
        const response = await api.get(`/ponto/user/${username}/week`);
        const data = response.data;

        const today = new Date().toDateString();
        const week = data.weekData.map((dayData: any): WeekEntry => {
          const isToday =
            dayData.startTime &&
            new Date(dayData.startTime).toDateString() === today;
          const hours =
            dayData.endTime
              ? calculateHours(dayData.startTime, dayData.endTime)
              : isToday && dayData.startTime && !dayData.endTime
              ? "Trabalhando"
              : "Sem registro";

          if (isToday) {
            if (!dayData.endTime) {
              const startTime = new Date(dayData.startTime).getTime();
              const now = Date.now();
              setElapsedTime(Math.floor((now - startTime) / 1000));
              setIsClockedIn(true);
              setIsClockedOut(false);
            } else {
              setIsClockedOut(true);
              setIsClockedIn(false);
              setTimeToday(calculateHours(dayData.startTime, dayData.endTime));
            }
          }

          return {
            day: dayData.day,
            hours,
            isToday,
            meetsTarget:
              dayData.endTime &&
              calculateHoursInDecimal(dayData.startTime, dayData.endTime) >=
                7.5,
          };
        });

        setWeekData(week);

        const todayData = week.find((entry: { isToday: any }) => entry.isToday);
        if (!todayData?.isToday || todayData?.hours === "Sem registro") {
          setTimeToday("0h 00m");
        }
        if (todayData?.hours && todayData.hours !== "Trabalhando") {
          setTimeToday(todayData.hours);
        }

        if (data.totalHoursWeek) {
          setTotalHoursWeek(`${Math.floor(data.totalHoursWeek)}h ${Math.round(
            (data.totalHoursWeek % 1) * 60
          )}m`);
        }
      } catch (error) {
        console.error("Erro ao buscar dados da semana:", error);
        alert("Erro ao carregar os dados da semana. Tente novamente.");
      }
    };

    fetchWeekData();
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

  const calculateHoursInDecimal = (start: string, end: string): number => {
    const diff = new Date(end).getTime() - new Date(start).getTime();
    return diff / (1000 * 60 * 60);
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
        setIsClockedOut(true);
      } else {
        await api.post(`/ponto/start/${username}`);
        alert("Ponto iniciado com sucesso!");
        setIsClockedIn(true);
        setIsClockedOut(false);
      }

      const response = await api.get(`/ponto/user/${username}/week`);
      setWeekData(
        response.data.weekData.map((dayData: any): WeekEntry => ({
          day: dayData.day,
          hours: dayData.endTime
            ? calculateHours(dayData.startTime, dayData.endTime)
            : "Sem registro",
          isToday: false,
          meetsTarget: false,
        }))
      );
    } catch (error) {
      console.error("Erro ao registrar ponto:", error);
      alert("Erro ao registrar ponto. Tente novamente.");
    }
  };

  return (
    <Container>
      <Content style={{ paddingTop: "2rem" }}>
        <Title>
          Relógio de <Highlight>Ponto</Highlight>
        </Title>
        <div style={{ marginBottom: "1rem", textAlign: "center" }}>
          <h1
            style={{
              fontSize: "3.5rem",
              color: isClockedIn ? "#fe8a00" : "#CFCFCF",
              margin: "0.5rem 0",
              fontWeight: "bold",
            }}
          >
            {timeToday}
          </h1>
          <p style={{ color: "#CFCFCF", fontSize: "1.3rem" }}>Horas de hoje</p>
        </div>
        <InputContainer>
          <Button
            onClick={handleClockInOut}
            disabled={isClockedOut}
            style={{
              cursor: isClockedOut ? "not-allowed" : "pointer",
              transform: isClockedIn && !isClockedOut ? "scale(1.05)" : "scale(1)",
              transition: "all 0.2s ease",
            }}
          >
            {isClockedOut
              ? "Ponto Finalizado"
              : isClockedIn
              ? "Finalizar Ponto"
              : "Iniciar Ponto"}
          </Button>
        </InputContainer>
        <h2 style={{ marginTop: "2rem", color: "#F5F5F5" }}>Semana Atual</h2>
        <div style={{ width: "100%", maxWidth: "400px" }}>
          {weekData.map((entry: WeekEntry, index) => (
            <div
              key={index}
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                backgroundColor: entry.meetsTarget
                  ? "rgba(0, 128, 0, 0.5)"
                  : entry.isToday
                  ? "rgba(244, 197, 66, 0.5)"
                  : "rgba(217, 217, 217, 0.05)",
                borderRadius: "4px",
                padding: "0.5rem 1rem",
                marginBottom: "0.5rem",
              }}
            >
              <span style={{ color: "#CFCFCF" }}>{entry.day}</span>
              <span style={{ color: "#F5F5F5", fontWeight: 700 }}>
                {entry.hours}
              </span>
            </div>
          ))}
        </div>
        <h3 style={{ marginTop: "1rem", color: "#F5F5F5" }}>
          Total na Semana: {totalHoursWeek}
        </h3>
      </Content>
    </Container>
  );
};

export default ClockInPage;
