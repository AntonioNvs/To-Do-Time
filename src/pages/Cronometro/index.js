import React, { useState, useEffect } from 'react'
import { Text, TouchableOpacity, StyleSheet, View, StatusBar, AsyncStorage } from 'react-native'

import { useNavigation } from '@react-navigation/native'

const Cronometro = () => {
  const navigation = useNavigation()
  const [seconds, setSeconds] = useState(0);
  const [isActive, setIsActive] = useState(false);
  const [text, setText] = useState('')

  function toggle() {
    setIsActive(!isActive);
  }

  function reset() {
    setSeconds(0);
    setIsActive(false);
  }

  useEffect(() => {
    let interval = null;
    if (isActive) {
      interval = setInterval(() => {
        setSeconds(seconds => seconds + 1);
      }, 1000);
    } else if (!isActive && seconds !== 0) {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [isActive, seconds]);

  function handleNavigateToDashboard() {
    if (isActive) {
      return;
    }
    navigation.navigate('Dashboard')
  }

  return (
    <>
      <StatusBar backgroundColor="#F1FBF2"/>
      <View style={styles.container}>
        <Text style={styles.textTime}>
          {Math.floor(seconds/3600) < 10 ? `0${Math.floor(seconds/3600)}` : Math.floor(seconds/3600)}
          :{Math.floor((seconds % 3600) / 60) < 10 ? `0${Math.floor((seconds % 3600) / 60)}` : Math.floor((seconds % 3600) / 60)}
          .{seconds % 60 < 10 ? `0${seconds % 60}` : seconds % 60}
          </Text>
        <View style={styles.buttonContainer}>
          <TouchableOpacity 
            style={styles.button}
            onPress={toggle}  
          >
            <Text style={styles.textButton}>{isActive ? 'Stop' : 'Start'}</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            onPress={reset}
            style={styles.button}
          >
            <Text style={styles.textButton}>Clear</Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity 
          style={styles.finishButton}
          onPress={handleNavigateToDashboard}
        >
          <Text style={styles.textButton}>Finish</Text>
        </TouchableOpacity>
      </View>
    </>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#F1FBF2',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  textTime: {
    fontSize: 64,
    fontWeight: 'bold',
    color: '#64DF18'
  },
  buttonContainer: {
    flexDirection: 'row',
    marginTop: 40
  },
  button: {
    width: 144,
    height: 72,
    backgroundColor: '#64DF18',
    marginHorizontal: 24,
    justifyContent: 'center',
    alignItems: 'center',

    borderRadius: 8
  },
  textButton: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFF',
    textAlign: 'center'
  },
  finishButton: {
    position: 'absolute',
    bottom: 0,
    marginBottom: 72,

    width: 144,
    height: 72,
    backgroundColor: '#3b3b3a',
    marginHorizontal: 24,
    justifyContent: 'center',
    alignItems: 'center',

    borderRadius: 8
  }
})

export default Cronometro

