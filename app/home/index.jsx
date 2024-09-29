import { View } from 'react-native'
import React from 'react'
import { Button, Text } from 'react-native-paper'
import { signOut } from 'firebase/auth'
import { AUTH } from '../../firebaseConfig'

export default function HomeScreen() {
    return (
        <View>
            <Text variant='displayMedium' className="text-center">Home Screen</Text>
            <Button
                mode='contained'
                buttonColor='#FF7F3E'
                className="w-[40%] self-center mt-6"
                onPress={() => {
                    signOut(AUTH)
                }}
            >
                Sign out
            </Button>
        </View>
    )
}