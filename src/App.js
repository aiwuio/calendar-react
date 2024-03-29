import React, { useState, useEffect } from 'react';
import './App.css';
import Modal from 'react-modal';
import ruLocale from 'date-fns/locale/ru';
import { format, addMonths, addDays } from 'date-fns';
import SaveIcon from '@mui/icons-material/Save';


Modal.setAppElement('#root');

const Calendar = () => {
  const [selectedDate, setSelectedDate] = useState(null);
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [taskText, setTaskText] = useState('');
  const [reminderTime, setReminderTime] = useState(new Date());
  const [tasks, setTasks] = useState({}); // Хранение задач для каждой даты

  useEffect(() => {
    // Меняем цвет квадратиков при изменении задач
    const squares = document.querySelectorAll('.day');
    squares.forEach((square) => {
      const date = parseInt(square.textContent, 10);
      const taskKey = format(currentMonth, 'yyyy-MM') + '-' + date;
      if (tasks[taskKey]) {
        square.classList.add('task-saved');
      } else {
        square.classList.remove('task-saved');
      }
    });
  }, [tasks, currentMonth]);

  const handleDateClick = (date) => {
    setSelectedDate(date);
    setTaskText(tasks[format(currentMonth, 'yyyy-MM') + '-' + date] || ''); // Загрузка текста задачи для выбранной даты
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  const handleSaveTask = () => {
    const taskKey = format(currentMonth, 'yyyy-MM') + '-' + selectedDate;
    setTasks({ ...tasks, [taskKey]: taskText }); // Сохранение текста задачи для выбранной даты
    setIsModalOpen(false);
  };

  const handlePrevMonth = () => {
    setCurrentMonth((prevMonth) => addMonths(prevMonth, -1));
  };

  const handleNextMonth = () => {
    setCurrentMonth((prevMonth) => addMonths(prevMonth, 1));
  };

  const handleMonthChange = (event) => {
    const selectedMonth = new Date(event.target.value + '-01'); // Преобразуем выбранный месяц в объект Date
    setCurrentMonth(selectedMonth);
  };

  const handleYearChange = (event) => {
    const newYear = event.target.value;
    setCurrentMonth((prevMonth) => new Date(newYear, prevMonth.getMonth(), 1));
  };

  const handleAddButtonClick = () => {
    // Your logic for the add button click
    console.log('Add button clicked');
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
        {daysArray.map((day) => {
          const taskKey = format(currentMonth, 'yyyy-MM') + '-' + day;
          const hasTask = tasks[taskKey];

          return (
            <div
              key={day}
              className={`day ${selectedDate === day ? 'selected' : ''} ${hasTask ? 'task-saved' : ''}`}
              onClick={() => handleDateClick(day)}
            >
              {day}
            </div>
          );
        })}
      </div>
    );
  };
 
  const generateMonthOptions = () => {
    return Array.from({ length: 12 }, (_, index) => (
      <option key={index} value={format(new Date(currentMonth.getFullYear(), index), 'yyyy-MM', { locale: ruLocale })}>
        {format(new Date(currentMonth.getFullYear(), index), 'LLLL', { locale: ruLocale })}
      </option>
    ));
  };

  return (
    <div className="container">
      <h1>Календарь</h1>
      <div className="month-navigation">
        <button onClick={handlePrevMonth}>&lt; </button>
        <select value={format(currentMonth, 'yyyy-MM')} onChange={handleMonthChange}>
          {generateMonthOptions()}
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
      {isModalOpen && <div className="overlay" onClick={handleModalClose} />}
      <Modal
        isOpen={isModalOpen}
        onRequestClose={handleModalClose}
        contentLabel="Task Modal"
        className="modal"
      >
        <div className="modal-header">
          <h2>Добавить задачу</h2>
          <button className="close-button" onClick={handleModalClose}>&times;</button>
        </div>
        <div className="modal-body">
          <label>Текст задачи: </label>
          <input type="text" value={taskText} onChange={(e) => setTaskText(e.target.value)} />
        </div>
        <div className="modal-footer">
        <button onClick={handleSaveTask}>
        Сохранить
        <SaveIcon sx={{ marginRight: 8 }} /> 
      </button>
        </div>
      </Modal>
      <div className="add-icon" onClick={handleAddButtonClick}>
      </div>
    </div>
  );
};

function App() {
  return (
    <div className="App">
      <Calendar />
    </div>
  );
}

export default App;
