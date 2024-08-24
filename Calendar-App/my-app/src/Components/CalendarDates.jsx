import React from 'react';
export default function CalendarDates({ week, handleCellClicked}) {

    const currDate = new Date().getDate()
    console.log(currDate) 

    const handleClick = (index) => (e) => {
        const date = e.target.textContent;   
        handleCellClicked(index, date)
        
    };
    return (
        <>

            {
                week?.map((days, index) => (
                    days === currDate ? (
                        <td onClick={handleClick(index)} key={index} style={{backgroundColor: '#ffecb3' }}> {days}</td>
                    ) : (
                        <td onClick={handleClick(index)} key={index}>{days}</td>
                    )
                    
                ))
            }

        </>
    );
}
