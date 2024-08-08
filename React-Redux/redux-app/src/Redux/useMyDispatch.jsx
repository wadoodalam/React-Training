import StoreContext from "../Provider/StoreContext";
import { useContext } from "react";

export default function useMyDispatch() {
    const store = useContext(StoreContext);
    return store.dispatch;
}