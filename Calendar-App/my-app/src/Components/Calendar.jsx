import React, { useEffect, useState } from 'react';
import CalendarDates from './CalendarDates';
export default function Calendar() {
    const date = new Date();

    const [weeks, setWeeks] = useState([]);
    const [currYear, setCurrYear] = useState(date.getFullYear());
    const [currMonth, setCurrMonth] = useState(date.getMonth() - 7);
    const [cellFlag, setCellFlag] = useState(false);
    const [cellDayNum, setCellDayNum] = useState();
    const [cellDate, setCellDate] = useState();

    //console.log(date.getDate())

    const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

    const month = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];


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

    const monthDays = daysInMonth(currYear, currMonth);
    const firstDayOfMonth = getFirstDayOfMonth(currYear, currMonth);

    useEffect(() => {
        const weeksArr = getWeeksArr(monthDays, firstDayOfMonth);
        setWeeks(weeksArr);
    }, [monthDays, firstDayOfMonth]);

    const handleCellClicked = (dayNum, date) => {
        setCellDate(date);
        setCellDayNum(dayNum);
        setCellFlag(true);
    };
    const getPrevMonth = (month) => {
        let prevMonth;
        if (month === 0) {
            prevMonth = 11;
        } else {
            prevMonth = currMonth - 1;
        }
        return prevMonth;
    };

    const getNextMonth = (month) => {
        let nextMonth;
        if (month === 11) {
            nextMonth = 0;
        } else {
            nextMonth = month + 1;
        }
        return nextMonth;
    };

    //console.log(prevMonth, currMonth, nextMonth)
    const handlePrevMonthClick = () => {
        if (currMonth === 0) {
            setCurrYear(currYear - 1);
        }
        setCurrMonth(getPrevMonth(currMonth));
    };

    const handleNextMonthClick = () => {
        if (currMonth === 11) {
            setCurrYear(currYear + 1);
        }
        setCurrMonth(getNextMonth(currMonth));
    };
    if (cellFlag) {
        return (
            <div>
                <h2>Date: {cellDate}</h2>
                <h2>Day: {days[cellDayNum]}</h2>
                <h2>Month: {month[currMonth]}</h2>
                <h2>Year: {currYear}</h2>
                <h2>
                    {cellDate}th {month[currMonth]} {[currYear]}
                </h2>
                <button onClick={() => { setCellFlag(false); }}> Go Back</button>
            </div>
        );
    }
    return (
        <div>

            <div className='nav-bar'>
                <span>
                    <button onClick={handlePrevMonthClick}> &lt; </button>
                    <span> {month[getPrevMonth(currMonth)]} {month[currMonth]} {month[getNextMonth(currMonth)]}</span>
                    <button onClick={handleNextMonthClick}> &gt; </button>
                    Full year {currYear}
                </span>
            </div>

            <h1>Calendar for {month[currMonth]} {currYear}</h1>
            <table className="calendar">
                <thead>
                    <tr className="curr-month">
                        <th colSpan="7">{month[currMonth]}</th>
                    </tr>
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
                        weeks?.map((week) => (
                            <tr>
                                <CalendarDates week={week} handleCellClicked={handleCellClicked} />
                            </tr>
                        ))
                    }
                </tbody>
            </table>
        </div>
    );
}
