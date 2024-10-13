import { useState } from 'react';
import { View } from 'react-native';
import { IconButton, Menu, PaperProvider, Text } from 'react-native-paper';
import { AUTH } from '../../../firebaseConfig';
import { signOut } from 'firebase/auth';

export function Topbar({ children }) {
    const [menuVisible, setMenuVisible] = useState(false);

    const openMenu = () => setMenuVisible(true);
    const closeMenu = () => setMenuVisible(false);

    const handleSignOut = () => {
        closeMenu();
        signOut(AUTH);
    };

    return (
        <PaperProvider>
            <View className="p-4">
                <View className="flex flex-row justify-between">
                    <Text variant="displaySmall">Perfil</Text>
                    <Menu visible={menuVisible} onDismiss={closeMenu} anchor={<IconButton onPress={openMenu} icon="dots-vertical" size={25} />}>
                        <Menu.Item leadingIcon="logout-variant" onPress={handleSignOut} title="Cerrar sesión" />
                    </Menu>
                </View>
                {children}
            </View>
        </PaperProvider>
    );
}
