import { useState } from 'react';
import { BottomNavigation } from 'react-native-paper';
import { ROUTES } from '../../util/types';
import { router } from 'expo-router';

const historialIcono = require('../../assets/navbarIcons/historyicon.png');
const rutinasIcono = require('../../assets/navbarIcons/ejercicioicono.png');
const perfilIcono = require('../../assets/navbarIcons/profileicon.png');
const ejerciciosIcono = require('../../assets/navbarIcons/pesaicono.png');
const graficosIcono = require('../../assets/navbarIcons/graficasicono.png');

export const NavBar = () => {
    const [navState, setNavState] = useState({
        index: 2,
        routes: [
            {
                key: 'historial',
                title: 'Historial',
                focusedIcon: historialIcono,
                unfocusedIcon: historialIcono,
            },
            {
                key: 'rutinas',
                title: 'Rutinas',
                focusedIcon: rutinasIcono,
                unfocusedIcon: rutinasIcono,
            },
            {
                key: 'HOME',
                title: 'Perfil',
                focusedIcon: perfilIcono,
                unfocusedIcon: perfilIcono,
            },
            {
                key: 'EXERCISE',
                title: 'Ejercicios',
                focusedIcon: ejerciciosIcono,
                unfocusedIcon: ejerciciosIcono,
            },
            {
                key: 'graficos',
                title: 'Graficos',
                focusedIcon: graficosIcono,
                unfocusedIcon: graficosIcono,
            },
        ],
    });

    return (
        <BottomNavigation.Bar
            className="mt-auto mb-6 absolute bg-[#f2f2f2]"
            navigationState={navState}
            onTabPress={({ route }) => {
                const { key } = route;

                setNavState((prev) => {
                    const rutaIdx = prev.routes.findIndex((elem) => elem.key === key);
                    const newNavState = {
                        index: rutaIdx,
                        routes: [...prev.routes],
                    };
                    return newNavState;
                });
                if (ROUTES[key]) {
                    router.replace(ROUTES[key]);
                }
            }}
        />
    );
};
