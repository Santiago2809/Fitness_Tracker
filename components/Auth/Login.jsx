import { Link, router } from 'expo-router';
import React, { useState } from 'react';
import { StyleSheet, View, TextInput, TouchableOpacity } from 'react-native';
import { Appbar, Button, Text } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { userLogin } from '../../services/auth';


export const Login = () => {
    const [passwordVisible, setPasswordVisible] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    function handleLogin() {
        userLogin(email, password);
    }


    return (
        <View style={styles.container}>
            <Appbar>
                <Appbar.BackAction onPress={() => { router.replace("/") }} />
            </Appbar>
            <Text style={styles.welcomeText}>¡Bienvenido de nuevo!</Text>

            <View style={styles.inputContainer}>
                <TextInput
                    placeholder="Correo electrónico"
                    style={styles.input}
                    value={email}
                    onChangeText={(text) => setEmail(text)}
                />
                {email.length > 0 && (
                    <TouchableOpacity onPress={() => setEmail('')}>
                        <Icon name="close-circle" size={24} color="#999" style={{ marginLeft: 10 }} />
                    </TouchableOpacity>
                )}
            </View>

            <View style={styles.inputContainer}>
                <TextInput
                    placeholder="Contraseña"
                    style={styles.input}
                    value={password}
                    onChangeText={value => setPassword(value)}
                    secureTextEntry={!passwordVisible}
                />
                <TouchableOpacity onPress={() => setPasswordVisible(!passwordVisible)}>
                    <Icon
                        name={passwordVisible ? "eye-off-outline" : "eye-outline"}
                        size={24}
                        color="#999"
                        style={{ marginLeft: 10 }}
                    />
                </TouchableOpacity>
            </View>

            <Text style={styles.forgotPassword}>¿Has olvidado tu contraseña?</Text>

            <Button
                mode="contained"
                buttonColor="#FF7F3E"
                textColor="white"
                style={styles.loginButton}
                onPress={handleLogin}
            >
                Iniciar sesión
            </Button>

            <Link asChild href="/auth/register">
                <Text style={{ textAlign: 'center', marginTop: 20 }}>
                    ¿No tienes una cuenta? <Text style={{ color: '#FF7F3E', fontWeight: 'bold', }}>Regístrate</Text>
                </Text>
            </Link>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        paddingHorizontal: 30,
        paddingVertical: 10,
        backgroundColor: '#fff',
    },
    welcomeText: {
        fontSize: 24,
        fontWeight: 'bold',
        textAlign: 'center',
        marginTop: 150,
        marginBottom: 60,
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 8,
        paddingHorizontal: 10,
        marginBottom: 30,
    },
    input: {
        flex: 1,
        height: 50,
        paddingHorizontal: 10
    },
    forgotPassword: {
        textAlign: 'right',
        marginBottom: 20,
        color: '#FF7F3E',
        fontWeight: 'bold',
    },
    loginButton: {
        marginBottom: 20,
        borderRadius: 20,
        marginTop: 80,
        width: 180,
        alignSelf: 'center',
    },
});
