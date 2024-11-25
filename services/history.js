import { addDoc, collection, getDocs, query, where, writeBatch } from "firebase/firestore";
import { AUTH, DB } from "../firebaseConfig"


export const addSession = async (idRoutine) => {
    const userId = AUTH.currentUser.uid;
    const now = (new Date()).toISOString();

    try {
        if (!userId) {
            throw new Error("No hay usuario")
        }

        const collectionRef = collection(DB, "Usuaros", userId, "history");
        const docRef = await addDoc(collectionRef, {
            routine_id: idRoutine,
            created_at: now
        })
        console.log("Sesion agregada con exito con el id: " + docRef.id);
    } catch (error) {
        console.log(error);
    }
}

export const getHistory = async () => {
    const userId = AUTH.currentUser.uid;
    try {
        if (!userId) {
            throw new Error("No hay usuario")
        }

        const querySnapshot = await getDocs(collection(DB, "Usuaros", userId, "history"));
        let history = [];
        querySnapshot.forEach(doc => history.push({
            id: doc.id,
            ...doc.data()
        }))
        return history;

    } catch (error) {
        console.log(error);
    }
}


export const getRoutineHistory = async (routine_id) => {
    const userId = AUTH.currentUser.uid;
    try {
        if (!userId) throw new Error("Ha ocurrido un problema, no existe el usuario.");
        console.log("********** " + routine_id + " **********");
        const q = query(collection(DB, "Usuaros", userId, "history"), where("routine_id", "==", routine_id));
        const querySnapshot = await getDocs(q);
        const routines = [];
        querySnapshot.forEach(doc => {
            routines.push({ ...doc.data() })
        })
        return routines;
    } catch (error) {
        console.log(error);
    }
}