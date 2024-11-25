import { useEffect, useState } from "react"
import { getRoutineHistory } from "../services/history";



export const useRoutineHistory = (routineId) => {

    const [isLoading, setIsLoading] = useState(false)
    const [data, setData] = useState(null)
    const [error, setError] = useState(null);

    useEffect(() => {

        (async () => {
            setIsLoading(true);
            try {
                const fetchedData = await getRoutineHistory(routineId);
                setData(fetchedData);

            } catch (e) {
                setError(e);
            } finally {
                setIsLoading(false);
            }
        })();

    }, []);


    return [error, isLoading, data];

}