import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  ScrollView,
  Keyboard
} from 'react-native';
import { db } from '../../Database';
import {
  addDoc,
  collection,
  doc,
  getDoc,
  setDoc,
  getDocs,
  onSnapshot,
  deleteDoc,
  deleteField,
  updateDoc
} from "firebase/firestore";
import { getAuth, Unsubscribe } from "firebase/auth";
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

export default function Home({ navigation }) {

  const [task, setTask] = useState([])

  async function createTasks() {
    await addDoc(collection(db, 'tasks'), {
      descripition: task,
    })
    Keyboard.dismiss()
  }

  async function querySnapShotUser() {

    const usersQuery = collection(db, 'tasks');
    await onSnapshot(usersQuery, (snapshopt) => {
      let listTask = []
      snapshopt.forEach((doc) => {
        setTask()
        listTask.push(doc.data())
        setTask(listTask)
        Keyboard.dismiss()
        return true
      })
    })
  }

  async function logout() {
    const auth = getAuth();
    auth.signOut();
    navigation.navigate("Login");
  }


  async function deleteItem() {
    alert('Delete')
  }

  const renderItemTask = ({ item }) => {
    return (
      <View style={styles.cardViewItem}>
        <View style={{ justifyContent: 'center', alignItems: 'center' }}>
          <TouchableOpacity onPress={deleteItem} style={styles.buttonDelete}>
            <MaterialIcons
              name="delete"
              size={30}
              color="#232323"
            />
          </TouchableOpacity>
        </View>
        <Text style={styles.textItemDescription}> {item.descripition} </Text>
      </View>
    )
  }

  useEffect(() => {
    querySnapShotUser();
  }, []);

  return (
    <KeyboardAvoidingView style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}>
      <TouchableWithoutFeedback>

        <View style={styles.container}>
          <StatusBar style="light" />

          <Text style={styles.textMain}>To-Do</Text>
          <TextInput style={styles.textInput}
            placeholder="description tasks"
            placeholderTextColor="#90D700"
            autoCapitalize="none"
            autoCorrect={false}
            keyboardType='default'
            value={task}
            onChangeText={(text) => setTask(text)}
          />

          <TouchableOpacity style={styles.buttonTask} onPress={createTasks}>
            <Text style={styles.textTask}>Create</Text>
          </TouchableOpacity>

          <FlatList
            style={{ marginTop: 20 }}
            data={task}
            keyExtractor={(item) => item.id}
            renderItem={renderItemTask}
          />

          <TouchableOpacity onPress={logout} style={styles.buttonLogout}>
            <MaterialIcons
              name="logout"
              size={30}
              color="#232323"
            />
          </TouchableOpacity>

        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0B0B0B',
    paddingTop: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonLogout: {
    width: 60,
    height: 60,
    backgroundColor: '#90D700',
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
    marginTop: 10,
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
  buttonTask: {
    width: 300,
    height: 50,
    borderRadius: 5,
    margin: 5,
    backgroundColor: '#90D700',
    justifyContent: 'center',
    alignItems: 'center',
  },
  textTask: {
    color: '#232323',
    fontSize: 22,
    padding: 15,
    textAlign: 'center',
  },
  textMain: {
    color: '#90D700',
    fontSize: 60,
    textAlign: 'center',
    fontWeight: 'bold',
    marginBottom: 30,
  },
  textItemDescription: {
    fontSize: 22,
    color: '#90D700',
    padding: 10
  },
  cardViewItem: {
    flexDirection: 'row',
    padding: 5,
    backgroundColor: '#232323',
    width: '100%',
    height: 50,
    borderRadius: 5,
    margin: 5,
    alignItems: 'center',
  },
  buttonDelete: {
    height: 40,
    width: 50,
    borderRadius: 5,
    backgroundColor: '#90D700',
    justifyContent: 'center',
    alignItems: 'center',
  }
});
