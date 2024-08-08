import store from "../Redux/redux-index";
import StoreContext from "./StoreContext";

export default function StoreProvider({ children }) {
    return (
        <StoreContext.Provider value={store}>
            {children}
        </StoreContext.Provider>
    );
}