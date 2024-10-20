import { Image, StyleSheet, View } from 'react-native';
import { ActivityIndicator, Button, Text } from 'react-native-paper';

import { useCurrentUser } from '../../hooks/useCurrentUser';
import { DataField } from '../../components/UI/Profile/DataField';
import { Topbar } from '../../components/UI/Profile/Topbar';
import { router } from 'expo-router';
import { ROUTES } from '../../util/types';

const profileIcon = require('../../assets/navbarIcons/profileicon.png');

export default function HomeScreen() {
    const [user, isLoading, error] = useCurrentUser();
    const handleEdit = () => {
        router.replace(ROUTES.EDIT);
    };

    if (isLoading) {
        return (
            <View className="h-full justify-center">
                <ActivityIndicator animating={true} size={90} />
            </View>
        );
    }

    if (error) {
        return (
            <Topbar>
                <View className="items-center mt-24">
                    <Text variant="titleLarge">{error.title ?? 'Ha ocurrido un error!. Intenta de nuevo'}</Text>
                </View>
            </Topbar>
        );
    }

    return (
        <Topbar>
            <View className="flex-row items-center gap-x-3 mt-4">
                <Image source={profileIcon} style={styles.profileIcon} />
                <View>
                    <Text variant="headlineSmall">{user.name ?? 'Sin asingar'}</Text>
                    <Text variant="titleMedium">{user.email ?? 'Sin asingar'}</Text>
                </View>
            </View>

            <View className="items-center mt-10">
                <DataField title="Genero" data={user.genero ?? 'Sin asignar'} />
                <DataField title="Edad" data={user.edad ?? 'Sin asignar'} />
                <DataField title="Estatura" data={user.altura ? `${user.altura} cm` : 'Sin asignar'} />
                <DataField title="Peso" data={user.peso ? `${user.peso} kg` : 'Sin asignar'} />
                <Button mode="contained" buttonColor="#FF7F3E" style={styles.editButton} onPress={handleEdit}>
                    <Text variant="labelLarge" className="text-slate-100">
                        Editar
                    </Text>
                </Button>
            </View>
        </Topbar>
    );
}

const styles = StyleSheet.create({
    profileIcon: {
        width: 80,
        height: 80,
        borderRadius: 40, // Hacerlo circular
        marginBottom: 8,
    },
    editButton: {
        marginTop: 20,
        width: '40%', // Ajusta el ancho del botón
    },
});
