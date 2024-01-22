import React, { useState } from 'react';
import './App.css';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline'; // добавлен импорт иконки

const Calendar = () => {
  const [selectedDate, setSelectedDate] = useState(null);
  const [currentMonth, setCurrentMonth] = useState(new Date());

  const handleDateClick = (date) => {
    setSelectedDate(date);
  };

  const handlePrevMonth = () => {
    setCurrentMonth((prevMonth) => new Date(prevMonth.getFullYear(), prevMonth.getMonth() - 1, 1));
  };

  const handleNextMonth = () => {
    setCurrentMonth((prevMonth) => new Date(prevMonth.getFullYear(), prevMonth.getMonth() + 1, 1));
  };

  const handleMonthChange = (event) => {
    const newMonth = event.target.value;
    setCurrentMonth((prevMonth) => new Date(prevMonth.getFullYear(), newMonth, 1));
  };

  const handleYearChange = (event) => {
    const newYear = event.target.value;
    setCurrentMonth((prevMonth) => new Date(newYear, prevMonth.getMonth(), 1));
  };

  const handleAddButtonClick = () => {
    // Добавьте вашу логику обработки клика здесь
    console.log('Кнопка "Добавить" была нажата');
  };

  const generateCalendar = () => {
    const daysInMonth = new Date(
      currentMonth.getFullYear(),
      currentMonth.getMonth() + 1,
      0
    ).getDate();

    const daysArray = Array.from({ length: daysInMonth }, (_, index) => index + 1);

    return (
      <div className="calendar">
        {daysArray.map((day) => (
          <div
            key={day}
            className={`day ${selectedDate === day ? 'selected' : ''}`}
            onClick={() => handleDateClick(day)}
          >
            {day}
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="container">
      <h1>Календарь</h1>
      <div className="month-navigation">
        <button onClick={handlePrevMonth}>&lt; </button>
        <select value={currentMonth.getMonth()} onChange={handleMonthChange}>
          {Array.from({ length: 12 }, (_, index) => (
            <option key={index} value={index}>
              {new Date(0, index).toLocaleString('default', { month: 'long' })}
            </option>
          ))}
        </select>
        <select value={currentMonth.getFullYear()} onChange={handleYearChange}>
          {Array.from({ length: 10 }, (_, index) => (
            <option key={index} value={currentMonth.getFullYear() - 5 + index}>
              {currentMonth.getFullYear() - 5 + index}
            </option>
          ))}
        </select>
        
        <button onClick={handleNextMonth}> &gt;</button>
        
      </div>
      {generateCalendar()}
      <div className="add-icon" onClick={handleAddButtonClick}>
        <AddCircleOutlineIcon />
      </div>
    </div>
  );
};


function App() {
  return (
    <div className="App">
       {/* <HamburgerButton /> */}
      <Calendar />
    </div>
  );
}

export default App;
