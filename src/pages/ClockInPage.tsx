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
  TimerDisplay,
} from "../styles/LoginPage.styles";
import WeekDayItem from "../components/WeekDayItem";
import { calculateHours, calculateHoursInDecimal, formatTime } from "../utils/timeUtils";

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
        <p style={{ fontSize: "1.2rem", color: "#CFCFCF", marginTop: "0.5rem" }}>
            Bem-vindo,{" "}
            <Highlight>
                {username
                    .split(".")
                    .map((part: string, index: number) =>
                        index === 1 
                            ? part.slice(0, -2).charAt(0).toUpperCase() + part.slice(1, -2)
                            : part.charAt(0).toUpperCase() + part.slice(1)
                    )
                    .join(" ")}
                </Highlight>
            </p>


        <TimerDisplay>
          {timeToday}
        </TimerDisplay>
        <InputContainer>
          <p style={{ color: "#CFCFCF", marginBottom: "1rem" }}>Horas de hoje</p>
          <Button
            onClick={handleClockInOut}
            disabled={isClockedOut}
            style={{
              backgroundColor: isClockedOut
                ? "#a9a9a9"
                : isClockedIn
                ? "#e63946"
                : "#fe8a00",
              transform: isClockedIn && !isClockedOut ? "scale(1.05)" : "scale(1)",
              cursor: isClockedOut ? "not-allowed" : "pointer",
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
          {weekData.map((entry, index) => (
            <WeekDayItem key={index} entry={entry} />
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
