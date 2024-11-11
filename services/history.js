import { addDoc, collection, writeBatch } from "firebase/firestore";
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

