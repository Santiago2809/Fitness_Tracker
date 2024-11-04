import { useEffect, useState } from "react"
import { getUserRoutines } from "../services/routines"


export const useUserRoutines = () => {
    const [routines, setRoutines] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        (async function () {
            setIsLoading(true)
            try {
                const userRoutine = await getUserRoutines();
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