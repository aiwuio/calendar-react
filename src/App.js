import React, { useState } from 'react';
import './App.css';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import Modal from 'react-modal';
import { format, addMonths, addDays } from 'date-fns';

Modal.setAppElement('#root');

const Calendar = () => {
  const [selectedDate, setSelectedDate] = useState(null);
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [taskText, setTaskText] = useState('');
  const [reminderTime, setReminderTime] = useState(new Date());
  const [tasks, setTasks] = useState({}); // Хранение задач для каждой даты

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
    const newMonth = event.target.value;
    setCurrentMonth((prevMonth) => new Date(prevMonth.getFullYear(), newMonth, 1));
  };

  const handleYearChange = (event) => {
    const newYear = event.target.value;
    setCurrentMonth((prevMonth) => {
      const newDate = new Date(prevMonth);
      newDate.setFullYear(parseInt(newYear, 10));
      return newDate;
    });
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
        <select value={format(currentMonth, 'yyyy-MM')} onChange={handleMonthChange}>
          {Array.from({ length: 12 }, (_, index) => (
            <option key={index} value={index}>
              {format(new Date(currentMonth.getFullYear(), index), 'LLLL yyyy')}
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
      <Modal
        isOpen={isModalOpen}
        onRequestClose={handleModalClose}
        contentLabel="Task Modal"
        className="modal"
      >
        <h2>Добавить задачу</h2>
        <label>Текст задачи:</label>
        <input type="text" value={taskText} onChange={(e) => setTaskText(e.target.value)} />
        <label>Время напоминания:</label>
        <input type="time" value={format(reminderTime, 'HH:mm')} onChange={(e) => setReminderTime(addDays(new Date(), 1))} />
        <button onClick={handleSaveTask}>Сохранить</button>
        <button onClick={handleModalClose}>Закрыть</button>
      </Modal>
      <div className="add-icon" onClick={handleAddButtonClick}>
        <AddCircleOutlineIcon />
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
