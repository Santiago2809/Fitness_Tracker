import { useEffect, useState } from "react"
import { getHistory } from "../services/history";


export const useHistory = () => {
    const [history, setHistory] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        (async function () {
            setIsLoading(true)
            try {
                const fetchedHistory = await getHistory();
                setHistory(fetchedHistory);
            } catch (err) {
                setError(err)
            } finally {
                setIsLoading(false)
            }
        })()
    }, []);

    return [error, isLoading, history];
}