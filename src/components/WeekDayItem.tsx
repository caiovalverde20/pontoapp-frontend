import React from 'react';

interface WeekEntry {
  day: string;
  hours: string;
  isToday: boolean;
  meetsTarget: boolean;
}

const WeekDayItem: React.FC<{ entry: WeekEntry }> = ({ entry }) => (
  <div
    style={{
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      backgroundColor: entry.meetsTarget
        ? 'rgba(0, 128, 0, 0.5)'
        : entry.isToday
          ? 'rgba(244, 197, 66, 0.5)'
          : 'rgba(217, 217, 217, 0.05)',
      borderRadius: '4px',
      padding: '0.5rem 1rem',
      marginBottom: '0.5rem',
    }}
  >
    <span style={{ color: '#CFCFCF' }}>{entry.day}</span>
    <span style={{ color: '#F5F5F5', fontWeight: 700 }}>{entry.hours}</span>
  </div>
);

export default WeekDayItem;
