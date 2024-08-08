
const carsInitialValue = [
    {
        id: 1,
        name: "toyota",
        quantity: 10,
    },
    {
        id: 2,
        name: "nissan",
        quantity: 10,
    },
    {
        id: 3,
        name: "ford",
        quantity: 10,
    },
];
// take current state and an action as an argument and returns a new state.
const carReducer = (state = carsInitialValue, action) => {
    switch (action.type) {
        case "SELL":
            return state.map((car) => {
                if (car.id === action.payload) {
                    return { ...car, quantity: car.quantity - 1 };
                } else {
                    return car;
                }
            });

        default:
            return state;
    }
};

//const store = createStore(carReducer, carsInitialValue);

const createMyStore = (reducer, preloadedState = {}, enhancer = undefined) => {
    const store = {};
    store.state = preloadedState;
    store.callbackFns = [];

    store.getState = () => {
        return store.state;
    };

    store.dispatch = (action) => {
        store.state = reducer(store.state, action);

        // call all the subscribed callback functions
        store.callbackFns.forEach((fn) => fn(action));
    };

    store.subscribe = (callbackFunc) => {
        store.callbackFns.push(callbackFunc);
        return () => {
            store.callbackFns.filter((fn) => fn !== callbackFunc);
        };
    };

    store.dispatch({ type: "redux/INIT" });
    return store;
};

const store = createMyStore(carReducer, carsInitialValue);

export default store;