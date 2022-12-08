import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import { 
  StyleSheet, 
  Text, 
  SafeAreaView, 
  TextInput, 
  TouchableOpacity, 
  KeyboardAvoidingView, 
  TouchableWithoutFeedback, 
  View } from 'react-native';
import { 
  getAuth, 
  signInWithEmailAndPassword, 
  onAuthStateChanged, 
  Unsubscribe } from "firebase/auth";
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';


import db from '../../Database/';


export default function Login({ navigation, route }) {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [erorSingUp, setErrorSingUp] = useState(false)

  async function login() {

    const auth = getAuth();

    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in 
        const user = userCredential.user;

        if (user) {
          navigation.navigate('Home', { userID: user.uid })
        } else { console.log('error'); }
      })
      .catch((error) => {
        console.log(error.code);
        console.log(error.message);
        setErrorSingUp(true)
      });
    setEmail()
    setPassword()
  }

  async function singUp() {
    navigation.navigate('SingUp')
  }

  useEffect(() => {
    const auth = getAuth();
    const Unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        navigation.navigate('Home')
      }
      else {
        console.log('User is not signed in');
      }
    })
    return Unsubscribe();
  }, [])

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}>
      <TouchableWithoutFeedback>
        <SafeAreaView>
          <StatusBar style="light" />

          <Text style={styles.textMain}>Login</Text>
          <TextInput style={styles.textInput}
            placeholder="Email"
            placeholderTextColor="#90D700"
            autoCapitalize="none"
            autoCorrect={false}
            keyboardType='email-address'
            value={email}
            onChangeText={(text) => setEmail(text)}
          />

          <TextInput style={styles.textInput}
            placeholder="Password"
            placeholderTextColor="#90D700"
            autoCapitalize="none"
            autoCorrect={false}
            value={password}
            keyboardType='numeric'
            onChangeText={(text) => setPassword(text)}
          />

          {erorSingUp === true
            ? <View style={{flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}}>
              <MaterialIcons
                name="info"
                size={25}
                color="#dbdbdb"
              />
              <Text style={styles.info}>
                invalide email address
              </Text>
            </View>
            : <View></View>}

          <TouchableOpacity style={styles.buttonLogin} onPress={login}>
            <Text style={styles.textLogin}>Login</Text>
          </TouchableOpacity>

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
  textInput: {
    margin: 5,
    fontSize: 18,
    width: 300,
    height: 50,
    borderRadius: 5,
    backgroundColor: '#232323',
    padding: 10,
    color: '#90D700',
  },
  buttonLogin: {
    width: 300,
    height: 50,
    borderRadius: 5,
    margin: 5,
    backgroundColor: '#90D700',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20
  },
  buttonSingUp: {
    width: 300,
    height: 50,
    borderRadius: 5,
    margin: 5,
    borderWidth: 1,
    borderColor: '#90D700',
  },
  textLogin: {
    color: '#232323',
    fontSize: 22,
    padding: 15,
    textAlign: 'center',
  },
  textSingUp: {
    color: '#90D700',
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
  }
});