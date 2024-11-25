import { useEffect, useState } from "react";
import { getExercises, getUserExercises } from "../services/exercise";



export function useExercises() {
    const [exercises, setExercises] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        (async function () {
            try {
                // const sysExercises = await getExercises();
                const userExercises = await getUserExercises();
                if (exercises.length > 0 || userExercises.length > 0) {
                    setExercises([...userExercises]);
                }

            } catch (err) {
                setError({ title: "Fallo la carga de los ejercicios", message: "Lo sentimos, trata mas tarde." })
            }
        })()
    }, []);

    return [error, exercises];
}