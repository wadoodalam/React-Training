import React from 'react';
export default function CalendarDates({ week, handleCellClicked, currMonth }) {

    const presentDate = new Date().getDate();
    const presentMonth = new Date().getMonth()

    const handleClick = (index) => (e) => {
        const date = e.target.textContent;
        handleCellClicked(index, date);

    };
    return (
        <>

            {
                week?.map((days, index) => (
                    days === presentDate && presentMonth === currMonth ? (
                        <td onClick={handleClick(index)} key={index} style={{ backgroundColor: '#ffecb3' }}> {days}</td>
                    ) : (
                        <td onClick={handleClick(index)} key={index}>{days}</td>
                    )

                ))
            }

        </>
    );
}
