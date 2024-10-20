import { useState } from 'react';
import { Keyboard, ScrollView, TouchableWithoutFeedback, View } from 'react-native';
import { IconButton, Menu, PaperProvider, Text } from 'react-native-paper';
import { AUTH } from '../../../firebaseConfig';
import { signOut } from 'firebase/auth';

export function Topbar({ edit = false, children }) {
    const [menuVisible, setMenuVisible] = useState(false);

    const openMenu = () => setMenuVisible(true);
    const closeMenu = () => setMenuVisible(false);

    const handleSignOut = () => {
        closeMenu();
        signOut(AUTH);
    };

    return (
        <PaperProvider>
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <ScrollView>
                    <View className="p-4" style={{ marginBottom: 150 }}>
                        <View className="flex flex-row justify-between">
                            <Text variant="displaySmall">{edit ? 'Editar' : 'Perfil'}</Text>
                            <Menu visible={menuVisible} onDismiss={closeMenu} anchor={<IconButton onPress={openMenu} icon="dots-vertical" size={25} />}>
                                <Menu.Item leadingIcon="logout-variant" onPress={handleSignOut} title="Cerrar sesión" />
                            </Menu>
                        </View>
                        {children}
                    </View>
                </ScrollView>
            </TouchableWithoutFeedback>
        </PaperProvider>
    );
}
