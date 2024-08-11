import store from "./redux-index";
import { useEffect, useState } from "react";

export default function useMySelector(selectorFunc) {
    const [selectedState, setSelectedState] = useState(selectorFunc(store.getState()));

    useEffect(() => {
        const unsubscribe = store.subscribe(() => {
            setSelectedState(selectorFunc(store.getState()));
        });
        // clean-up func
        return () => unsubscribe();
    }, [selectorFunc]);



    return selectedState;
}