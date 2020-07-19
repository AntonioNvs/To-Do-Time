import React, { useState } from 'react'
import { Text, View, StyleSheet, TextInput, TouchableOpacity, StatusBar, Alert} from 'react-native'
import { useNavigation } from '@react-navigation/native'

import DatePicker from 'react-native-datepicker';
import TimePicker from 'react-native-24h-timepicker';

import { addDays, format } from 'date-fns'
import getRealm from '../../services/realm'

import ArrowLeft from '../../assets/arrow-left.svg'
import Send from '../../assets/send.svg'
import Clock from '../../assets/clockBig.svg'

const Add = () => {
  const [storaged, setStoraged] = useState({
    title: '',
    dateInitial: format(new Date(), 'dd/mm/yyyy'),
    dateEnd: format(addDays(new Date(), 1), 'dd/mm/yyyy'),
    seconds: 0
  })
  const [showTimer, setShowTimer] = useState(false)

  const navigation = useNavigation()

  function handleNavigateToDashboard() {
    navigation.navigate('Dashboard')
  }

  async function saveDatabase() {
    const realm = await getRealm()

    realm.write(() => {
      realm.create('ToDo', storaged)
    })
  }

  async function handleSubmit() {
    try {
      Alert.alert(storaged.seconds)

      await saveDatabase()
    } catch (err) {
      Alert.alert(String(err))
    }

    navigation.navigate('Dashboard')
  }

  return (
    <>
      <StatusBar backgroundColor="#F1FBF2"/>
      <View style={styles.container}>
        <View style={styles.containerContent}>
          
          <View style={styles.topContent}>
            <Text style={styles.textTop}>Create</Text>
            <TouchableOpacity onPress={handleNavigateToDashboard}>
              <ArrowLeft style={{color: '#3b3b3a'}}/>
            </TouchableOpacity>
          </View>

          <View style={styles.title}>
            <Text style={styles.textTitle}>Title</Text>
            <TextInput 
              style={styles.textInpuTitle} 
              maxLength={60}
              onChangeText={text => setStoraged({...storaged, title: text})} 
            />
          </View>

          <View style={styles.date}>
            <Text style={styles.textTitle}>Initial</Text>
              <DatePicker 
                style={{ width: '100%', alignItems: 'center', marginTop: 12 }}
                format="DD-MM-YYYY"
                mode="clock"
                placeholder={storaged.dateInitial}
                minDate={new Date()}
                customStyles={{
                  dateIcon: {
                    position: 'absolute',
                    left: 0,
                    marginLeft: 0,
                  },
                  dateInput: {
                    marginLeft: 64,
                    width: 200,
                    padding: 12,
                    backgroundColor: '#EFEFEF',
                    borderRadius: 8,
                    borderColor: '#ffff',
                  },
                }}
                onDateChange={date => {
                  setStoraged({...storaged, dateInitial: date})
                }}
              />
            <Text style={styles.textTitle}>End</Text>
              <DatePicker 
                style={{ marginTop: 12, width: '100%', alignItems: 'center' }}
                format="DD-MM-YYYY"
                mode="date"
                placeholder={storaged.dateEnd}
                minDate={addDays(new Date, 1) }
                customStyles={{
                  dateIcon: {
                    position: 'absolute',
                    left: 0,
                    marginLeft: 0,
                  },
                  dateInput: {
                    marginLeft: 64,
                    width: 200,
                    padding: 12,
                    backgroundColor: '#EFEFEF',
                    borderRadius: 8,
                    borderColor: '#ffff',
                  },
                }}
                onDateChange={date => {
                  setStoraged({...storaged, dateEnd: date })
                }}
              />
          </View>
          <TouchableOpacity 
            style={styles.timeContainer}
            onPress={() => {
              setShowTimer(true)
            }}
          >
            <Clock style={{ color: '#64DF18'}}/>
            <TextInput style={styles.textInputTime} placeholder={storaged.seconds} />
            <TimePicker 
              onConfirm={(hour, minute) => {
                setStoraged({...storaged, seconds: hour * 3600 + minute * 60})
              }}
            />

          </TouchableOpacity>
          
          <View style={styles.buttonContainer}>
            <TouchableOpacity 
              style={styles.buttonSend}
              onPress={handleSubmit}
            >
              <Send color="#fff"/>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F1FBF2'
  },
  
  containerContent: {
    padding: 20,
    width: '75%',
    backgroundColor: '#fff',
    borderRadius: 12,
  },

  topContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  
  textTop: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#64DF18'
  },

  title: {
    marginTop: 40,
  },

  textTitle: {
    marginTop: 16,
    fontSize: 16,
    fontWeight: 'bold',
    color: '#64DF18'
  },

  textInpuTitle: {
    marginTop: 8,
    backgroundColor: '#EFEFEF',
    borderRadius: 8,
    padding: 8,

    fontSize: 12,
    fontWeight: 'bold',
    color: '#3b3b3a'
  },

  timeContainer: {
    marginTop: 32,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },

  textInputTime: {
    marginLeft: 12,
    backgroundColor: '#EFEFEF',
    borderRadius: 8,
    padding: 8,
    height: 40,
    width: 72,
    textAlign: 'center',

    fontSize: 12,
    fontWeight: 'bold',
    color: '#3b3b3a'
  },

  buttonContainer: {
    width: '100%',
    alignItems: 'center',
    marginTop: 40,
  },

  buttonSend: {
    width: 72,
    height: 40,
    backgroundColor: '#64DF18',
    alignItems: 'center',
    justifyContent: 'center',

    borderRadius: 8
  }
})

export default Add