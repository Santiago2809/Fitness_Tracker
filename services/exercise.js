import { addDoc, collection, deleteDoc, doc, getDocs } from 'firebase/firestore';
import { DB } from '../firebaseConfig';

export const getExercises = async () => {
    try {
        const querySnapshot = await getDocs(collection(DB, 'Ejercicio'));
        const exercises = [];
        querySnapshot.forEach((doc) => exercises.push({ ...doc.data(), ejercicioId: doc.id }));
        // console.log(exercises);
        return exercises;
    } catch (err) {
        console.log(err);
    }
};

export const addExercise = async (name) => {
    try {
        const docId = await addDoc(collection(DB, 'Ejercicio'), {
            name: name,
        });
        console.log(docId);
        return { ejercicioId: docId.id };
    } catch (err) {
        console.log(err);
        return null;
    }
};

export const deleteExercise = async (exerciseId) => {
    try {
        await deleteDoc(doc(DB, 'Ejercicio', exerciseId));
        console.log('Ejercicio eliminado:', exerciseId);
        return true;
    } catch (err) {
        console.log(err);
        return false;
    }
};
