import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import { StyleSheet, TextInput, Text, SafeAreaView, TouchableOpacity, KeyboardAvoidingView, TouchableWithoutFeedback, View, DrawerLayoutAndroidBase } from 'react-native';
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { collection, addDoc } from 'firebase/firestore';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

import db from '../../Database/';

export default function SingUp({ navigation }) {

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [erorSingUp, setErrorSingUp] = useState(false)

    async function singUp() {
        const auth = getAuth()
        createUserWithEmailAndPassword(auth, email, password)
            .then((value) => {
                // Signed in 
                const user = value.user;
                if (user) {
                    navigation.navigate('Login')
                } else {
                    console.log('error');
                }
            })
            .catch((error) => {
                console.log(error.code);
                console.log(error.message);
                setErrorSingUp(true)
            });
    }

    useEffect(() => {
    }, [])

    return (
        <KeyboardAvoidingView style={styles.container}
            behavior={Platform.OS === "ios" ? "padding" : "height"}>
            <TouchableWithoutFeedback>

                <SafeAreaView style={styles.container}>
                    <StatusBar style="light" />

                    <Text style={styles.textMain}>Sing-Up</Text>
                    <TextInput style={styles.TextInput}
                        placeholder="Name"
                        placeholderTextColor="#90D700"
                        autoCapitalize="none"
                        autoCorrect={false}
                        keyboardType='default'
                        value={name}
                        variant="outlined" label="Label"
                        onChangeText={(text) => setName(text)}
                    />

                    <TextInput style={styles.TextInput}
                        placeholder="Email"
                        placeholderTextColor="#90D700"
                        autoCapitalize="none"
                        autoCorrect={false}
                        keyboardType='email-address'
                        value={email}
                        variant="outlined" label="Label"
                        onChangeText={(text) => setEmail(text)}
                    />

                    <TextInput style={styles.TextInput}
                        placeholder="Password"
                        placeholderTextColor="#90D700"
                        autoCapitalize="none"
                        autoCorrect={false}
                        value={password}
                        variant="outlined" label="Label"
                        keyboardType='numeric'
                        onChangeText={(text) => setPassword(text)}
                    />

                    {erorSingUp === true
                        ? <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                            <MaterialIcons
                                name="info"
                                size={25}
                                color="#dbdbdb"
                            />
                            <Text style={styles.info}>
                                invalid fill in all fields
                            </Text>
                        </View>
                        : <View></View>}

                    <TouchableOpacity style={styles.buttonSingUp} onPress={singUp}>
                        <Text style={styles.textSingUp}>Sing-up</Text>
                    </TouchableOpacity>


                </SafeAreaView>
            </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#0B0B0B',
    },
    TextInput: {
        margin: 10,
        fontSize: 18,
        width: 300,
        height: 50,
        borderRadius: 5,
        backgroundColor: '#232323',
        padding: 10,
        color: '#90D700',
    },
    buttonSingUp: {
        width: 300,
        height: 50,
        borderRadius: 5,
        margin: 5,
        backgroundColor: '#90D700',
    },
    textSingUp: {
        color: '#232323',
        fontSize: 22,
        padding: 15,
        textAlign: 'center',
    },
    info: {
        color: '#dbdbdb',
        fontSize: 18,
    },
    textMain: {
        color: '#90D700',
        fontSize: 60,
        textAlign: 'center',
        fontWeight: 'bold',
        marginBottom: 30,
    },
});
