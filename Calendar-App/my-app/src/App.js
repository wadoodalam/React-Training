import logo from './logo.svg';
import './App.css';
import React, { useEffect, useState } from 'react';


function App() {
  const date = new Date();

  const [weeks, setWeeks] = useState([]);

  const days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday"
  ];

  const month = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December"
  ];

  const daysInMonth = (year, month) => {
    // date constructor starts from index 1, hence month + 1
    return new Date(year, month + 1, 0).getDate();
  };

  const getWeeksArr = (daysInMonth, firstDayOfMonth) => {
    const cells = [];

    // push empty cells for offset of the starting day
    for (let i = 0; i < firstDayOfMonth; i++) {
      cells.push(null);
    }
    for (let i = 1; i <= daysInMonth; i++) {

      cells.push(i);
    }

    let weeks = [];
    for (let i = 0; i < cells.length; i += 7) {
      //setWeeks(...weeks, [cells.slice(i, i + 7)])
      weeks.push(cells.slice(i, i + 7));
    }
    return weeks;
  };

  const getFirstDayOfMonth = (year, month) => {
    const firstDay = new Date(year, month, 1);
    //console.log(firstDay.getDay())
    return firstDay.getDay();
  };

  const monthDays = daysInMonth(2024, date.getMonth());
  const firstDayOfMonth = getFirstDayOfMonth(2024, date.getMonth());

  useEffect(() => {
    const weeksArr = getWeeksArr(monthDays, firstDayOfMonth);
    setWeeks(weeksArr);
  }, []);





  return (
    <div className="App">
      Calendar
      <table className="calendar">
        <thead>
          <tr className="curr-month">{month[date.getMonth()]}</tr>
          <tr className="days-row">
            {
              days.map((day) => (
                <th>{day}</th>
              ))
            }
          </tr>
        </thead>

        <tbody>
          {
            weeks.map((week) => (
              <tr>
                {week.map((days) => (
                  <td>{days}</td>
                ))}
              </tr>
            ))
          }
        </tbody>
      </table>
    </div>
  );
}

export default App;
