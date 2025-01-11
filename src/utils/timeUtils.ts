export const calculateHours = (start: string, end: string): string => {
    const diff = new Date(end).getTime() - new Date(start).getTime();
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    return `${hours}h ${minutes}m`;
  };
  
  export const calculateHoursInDecimal = (start: string, end: string): number => {
    const diff = new Date(end).getTime() - new Date(start).getTime();
    return diff / (1000 * 60 * 60); // Horas decimais
  };
  
  export const formatTime = (totalSeconds: number): string => {
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;
    return `${hours}h ${minutes}m ${seconds}s`;
  };
  