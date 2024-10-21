import { Image, StyleSheet, View } from 'react-native';
import { ActivityIndicator, Button, RadioButton, Text } from 'react-native-paper';
import { Topbar } from '../../components/UI/Profile/Topbar';
import { useCurrentUser } from '../../hooks/useCurrentUser';
import { EditField } from '../../components/UI/Profile/EditField';
import { router } from 'expo-router';
import { ROUTES } from '../../util/types';
import { useEffect, useState } from 'react';
import { editProfile } from '../../services/auth';

const profileIcon = require('../../assets/navbarIcons/profileicon.png');

export default function EditProfile() {
    const [user, isLoading, error] = useCurrentUser();
    const [editError, setEditError] = useState(false);
    const [editLoading, setEditLoading] = useState(false);

    const [genero, setGenero] = useState(null);
    const [edad, setEdad] = useState(null);
    const [estatura, setEstatura] = useState(null);
    const [peso, setPeso] = useState(null);

    useEffect(() => {
        if (Object.entries(user).length > 1) {
            setGenero(user.genero ?? null);
            setEdad(user.edad ?? null);
            setEstatura(user.altura ?? null);
            setPeso(user.peso ?? null);
        }
    }, [user]);

    function handleGoBack() {
        router.replace(ROUTES.HOME);
    }

    async function handleEdit() {
        setEditLoading(true);
        try {
            await editProfile(estatura, edad, peso, genero);
            router.replace(ROUTES.HOME);
        } catch (err) {
            setEditError(true);
        } finally {
            setEditLoading(false);
        }
    }

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
        <Topbar edit={true}>
            <View className="flex-row items-center gap-x-3 mt-4">
                <Image source={profileIcon} style={styles.profileIcon} />
                <View>
                    <Text variant="headlineSmall">{user.name ?? 'Sin asingar'}</Text>
                    <Text variant="titleMedium">{user.email ?? 'Sin asingar'}</Text>
                </View>
            </View>

            <View className="items-center mt-10">
                <View>
                    <RadioButton.Group
                        onValueChange={(value) => {
                            setGenero((prev) => (prev === value ? null : value));
                        }}
                    >
                        <RadioButton.Item color="#FF7F3E" label="Hombre" labelVariant="titleMedium" labelStyle={{ textDecorationLine: genero === 'male' ? 'underline' : 'none' }} value="male" status={genero === 'male' ? 'checked' : 'unchecked'} />
                        <RadioButton.Item
                            color="#FF7F3E"
                            label="Mujer"
                            labelVariant="titleMedium"
                            labelStyle={{ textDecorationLine: genero === 'female' ? 'underline' : 'none' }}
                            value="female"
                            status={genero === 'female' ? 'checked' : 'unchecked'}
                        />
                    </RadioButton.Group>
                </View>
                <EditField title="Edad" numeric data={edad ? edad.toString() : ''} onChange={setEdad} />
                <EditField title="Estatura" numeric data={estatura ? estatura.toString() : ''} onChange={setEstatura} />
                <EditField title="Peso" numeric data={peso ? peso.toString() : ''} onChange={setPeso} />

                {editError && (
                    <Text variant="titleLarge" className="text-red-500">
                        Algo ha ocurrido, intentalo de nuevo.
                    </Text>
                )}
                <Button mode="contained" buttonColor="#FF7F3E" style={styles.editButton} disabled={editLoading} onPress={handleEdit}>
                    <Text variant="labelLarge" className="text-white">
                        Actualizar
                    </Text>
                </Button>
                <Button mode="outlined" buttonColor="transparent" style={styles.editButton} onPress={handleGoBack}>
                    <Text variant="labelLarge" className="text-gray-500">
                        Cancelar
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
