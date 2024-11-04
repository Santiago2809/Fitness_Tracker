import { useEffect, useState } from "react"
import { getSystemRoutines, getUserRoutines } from "../services/routines"


export const useSystemRoutines = () => {
    const [routines, setRoutines] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        (async function () {
            setIsLoading(true)
            try {
                const userRoutine = await getSystemRoutines();
                setRoutines(userRoutine);

            } catch (err) {
                setError(err)
            } finally {
                setIsLoading(false)
            }
        })()
    }, []);

    return [error, routines, isLoading];
}