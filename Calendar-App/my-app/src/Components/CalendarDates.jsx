import React, { useEffect, useState } from 'react';

export default function CalendarDates({ week, handleCellClicked}) {

    const handleClick = (index) => (e) => {
        const date = e.target.textContent;   
        handleCellClicked(index, date)
        
    };
    return (
        <>

            {
                week?.map((days, index) => (
                    <td onClick={handleClick(index)} key={index}>{days}</td>
                ))
            }

        </>
    );
}
