import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { AUTH, DB } from '../firebaseConfig';
import { addDoc, collection, doc, setDoc } from 'firebase/firestore';

export const userLogin = async (email, password) => {
    try {
        const response = await signInWithEmailAndPassword(AUTH, email, password);
        /* const { user } = response;
        console.log(user.uid); */
        return null;

    } catch (error) {
        return Promise.reject({ error: true, message: "Correo o contraseña incorrectos. Inténtalo de nuevo." });
    }
};

export const userRegister = async (email, password, name) => {
    try {
        const response = await createUserWithEmailAndPassword(AUTH, email, password);
        const { user } = response;
        await setDoc(doc(DB, 'Usuaros', user.uid), {
            nombre: name,
            altura: 169,
            peso: 69,
        });
        console.log('Guardado con exito');
    } catch (error) {
        console.log(error);
    }
};
