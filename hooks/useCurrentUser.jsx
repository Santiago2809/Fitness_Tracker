import { doc, getDoc } from 'firebase/firestore';
import { useState, useEffect } from 'react';
import { AUTH, DB } from '../firebaseConfig';

export function useCurrentUser() {
    const [user, setUser] = useState({});
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        setIsLoading(true);

        (async () => {
            const { email, uid } = AUTH.currentUser;
            try {
                const user = await getDoc(doc(DB, 'Usuaros', uid));
                if (user.exists()) {
                    const userData = user.data();
                    setUser({
                        email: email,
                        name: userData.nombre,
                        altura: userData.altura,
                        peso: userData.peso,
                        genero: userData.genero,
                        edad: userData.edad,
                    });
                }
            } catch (err) {
                setError({
                    msg: err.message,
                    title: 'Ups! Something went wrong',
                });
            } finally {
                setIsLoading(false);
            }
        })();
    }, []);

    return [user, isLoading, error];
}
