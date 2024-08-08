import useMyDispatch from "../Redux/useMyDispatch";
import useMySelector from "../Redux/useMySelector";
import Car from "./Car";

export default function CarsApp() {

    //const cars = store.getState();
    // use useSelector so that re-render happens, it will not with the above line of code
    const cars = useMySelector((state) => state);

    const dispatch = useMyDispatch();

    const sellCarHandler = (id) => {
        dispatch({ type: "SELL", payload: id });
        // but re-render is not triggered, you need to use  useSelector
        //console.log(store.getState());
    };
    return (
        <div>
            {cars.map((car) => (
                <Car car={car} sellCarHandler={sellCarHandler} key={car.id} />
            ))}
        </div>
    );
}