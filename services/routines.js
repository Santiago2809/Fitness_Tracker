import { addDoc, collection, deleteDoc, doc, getDoc, getDocs } from 'firebase/firestore';
import { AUTH, DB } from '../firebaseConfig';


export const getSystemRoutines = async () => {
    try {
        const querySnapshot = await getDocs(collection(DB, "Rutinas"));
        const rutinas = [];
        querySnapshot.forEach(doc => rutinas.push({ id: doc.id, ...doc.data() }))
        // console.log(rutinas);
        return rutinas;
    } catch (err) {
        console.log(err);
    }
}

export const getUserRoutines = async () => {

    const userId = AUTH.currentUser.uid;
    const userDocRef = doc(DB, "Usuaros", userId);

    try {
        const querySnapshot = await getDocs(collection(userDocRef, "rutinas"));
        const userRoutines = [];

        querySnapshot.docs.forEach(doc => userRoutines.push({
            id: doc.id,
            ...doc.data()
        }));
        return userRoutines;
    } catch (err) {

    }
}

export const getRoutine = async (routineId, isUser = false) => {

    try {
        if (isUser) {
            //* Estas son las rutinas del usuario
            const userId = AUTH.currentUser.uid;
            const userDocRef = doc(DB, "Usuaros", userId, "rutinas", routineId);
            const docSnap = await getDoc(userDocRef);
            if (docSnap.exists()) {
                return docSnap.data();
            } else {
                console.log("No existe la rutina del usuario");
            }

        } else {
            // * Estas son las rutinas del sistema
            const docRef = doc(DB, "Rutinas", routineId);
            const docSnap = await getDoc(docRef);
            if (docSnap.exists()) {
                return docSnap.data();
            } else {
                console.log("No existe la rutina del sistema");
            }
        }
    } catch (error) {
        console.log(error);
    }
}

export const addRoutine = async (name, exercises) => {

    const userId = AUTH.currentUser.uid;

    try {
        const docRef = await addDoc(collection(DB, "Usuaros", userId, "rutinas"), {
            name: name,
            exercises
        })
        console.log("Rutina agregada con exito: " + docRef.id);
    } catch (err) {
        console.log(err);
    }
}

export const deleteRoutine = async (id) => {

    const userId = AUTH.currentUser.uid;

    try {
        await deleteDoc(doc(DB, "Usuaros", userId, "rutinas", id));
        console.log("Rutina elimiada con exito");
    } catch (error) {
        console.log(error);
    }


}