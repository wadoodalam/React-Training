import { createContext } from "react";
import { useEffect, useState } from "react";

export const OfficeContext = createContext([]);

export const OfficeContextProvider = ({ children }) => {
    const [offices, setOffices] = useState([]);

    useEffect(() => {
        const fetchOffices = async () => {
            try {
                const response = await fetch("http://localhost:3000/office");
                const data = await response.json();
                setOffices(data);
            } catch (error) {
                throw error;
            }
        };
        fetchOffices();
    }, []);

    return (
        // always wrap the values in an object
        <OfficeContext.Provider value={{ offices }}>
            {children}
        </OfficeContext.Provider>
    );
};