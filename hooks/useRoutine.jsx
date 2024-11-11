import { useEffect, useState } from "react"
import { getRoutine } from "../services/routines"


export const useRoutine = (routineId, isUser) => {
    const [routine, setRoutine] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        (async function () {
            setIsLoading(true)
            try {
                const fetchedRoutine = await getRoutine(routineId, isUser);
                setRoutine(fetchedRoutine);
            } catch (err) {
                setError(err)
            } finally {
                setIsLoading(false)
            }
        })()
    }, []);

    return [error, routine, isLoading];
}