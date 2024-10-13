import { addDoc, collection, getDocs } from 'firebase/firestore';
import { DB } from '../firebaseConfig';

export const getExercises = async () => {
    try {
        const querySnapshot = await getDocs(collection(DB, 'Ejercicio'));
        const exercises = [];
        querySnapshot.forEach((doc) => exercises.push(doc.data()));
        console.log(exercises);
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
