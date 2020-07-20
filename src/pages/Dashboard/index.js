import React, { useState, useEffect } from 'react'
import { Text, View, StyleSheet, TouchableOpacity, Alert, ScrollView } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import getRealm from '../../services/realm'

import Clock from '../../assets/clock.svg'
import Trash from '../../assets/trash-2.svg'
import Plus from '../../assets/plus.svg'

import { RectButton } from 'react-native-gesture-handler'

const Updated = () => {
  return new Promise(resolve => {
    setTimeout(resolve, 1000)
  })
}

const Dashboard = () => {
  const [storaged, setStoraged] = useState([])
  const [update, setUpdate] = useState(false)

  const navigation = useNavigation()

  useEffect(() => {
    let interval = null;
    interval = setInterval(() => {
      async function loadDatabase() {
        const realm = await getRealm()
  
        const data = realm.objects('ToDo')
  
        setStoraged(data)
      }
      loadDatabase()

      setUpdate(update ? false : true)
    }, 300);
    
    return () => clearInterval(interval);
  }, [update]);


  function handleNavigateToAdd() {
    navigation.navigate('Add')
  }

  function handleNavigateToCronometro(data) {
    navigation.navigate('Cronometro', { title: data.title })
  }

  function handleDelete(data) {
    Alert.alert('Are you sure?', '', [
      {
        text: 'Sim',
        onPress: () => deleteData(data)
      },
      {
        text: 'Não',
        onPress: () => {}
      }
    ])

    async function deleteData(data) {
      const realm = await getRealm()

      let result = realm.objects('ToDo').find(row => row.title === data.title)

      realm.write(() => {
        realm.delete(result)
      })

      setUpdate(true)
      Updated().then(() => setUpdate(false))
    }
  }

  return (
    <View style={styles.all}>
      <View style={styles.containerTop}>
        <Text style={styles.textTop}>To-Do-Time</Text>
      </View>

      <View style={styles.containerAllContent}>
        <ScrollView contentContainerStyle={styles.containerScrollView}>
          {storaged && storaged.map((data) => (
            <View key={data.title} style={styles.containerContent}>
              <View style={styles.topContent}>
                <Text style={styles.textContent}>{data.title}</Text>
                <RectButton onPress={() => handleNavigateToCronometro(data)}>
                  <Clock style={styles.clockImage}/>
                </ RectButton>
              </View>
              <View style={styles.endContent}>
                <View>
                  <Text style={styles.textDateEndContent}>{
                    data.dateInitial.substring(0, 5).replace('-', '/')} - {data.dateEnd.substring(0, 5).replace('-', '/')
                  }</Text>
                </View>
                <View style={styles.endRightContent}>
                  <Text style={styles.textTimeEndContent}>
                    {Math.floor(data.seconds/3600)}h
                    {Math.floor((data.seconds % 3600) / 60) === 0 ? '' : `${Math.floor((data.seconds % 3600) / 60)}m`}
                    </Text>
                  <TouchableOpacity onPress={() => {handleDelete(data)}}>
                    <Trash style={styles.trashImage}/>
                  </TouchableOpacity>
                </View>
              </View>
            </View>  
          ))} 
          

          <TouchableOpacity onPress={handleNavigateToAdd}>
            <Plus style={styles.plusImage}/>  
          </TouchableOpacity>
        </ScrollView>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  all: {
    backgroundColor: '#F1FBF2',
    flex: 1,
  },

  containerTop: {
    top: 0,
    backgroundColor: '#64DF18',
    height: '20%',
    justifyContent: 'center',
  },

  containerAllContent: {
    flex: 1,
  },

  containerScrollView: {
    alignItems: 'center'
  },

  textTop: {
    color: '#FFF',
    fontSize: 36,
    fontWeight: 'bold',
    marginLeft: 40,
  },

  containerContent: {
    padding: 12,
    backgroundColor: '#fff',
    borderRadius: 8,
    width: '75%',
    marginTop: 20,
    height: 80,
  },

  clockImage: {
    width: 20,
    height: 20,
    color: '#7D7D7D',
  },

  trashImage: {
    width: 20,
    height: 20,
    color: '#C6C6C6',
  },

  plusImage: {
    marginTop: 20,
    color: '#3b3b3a',
    width: 40,
    height: 40,
  },

  textContent: {
    color: '#3b3b3a',
    fontWeight: 'bold',
  },

  topContent: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },

  endContent: {
    marginTop: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  textDateEndContent: {
    color: '#BABABA',
    fontWeight: 'bold',
  },

  textTimeEndContent: {
    color: '#64DF18',
    fontWeight: 'bold',
    marginRight: 12,
  },

  endRightContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  }
})

export default Dashboard