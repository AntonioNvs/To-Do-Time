import React, { useState } from 'react'
import { Text, View, StyleSheet, TextInput, TouchableOpacity, StatusBar, Alert} from 'react-native'
import { useNavigation } from '@react-navigation/native'

import { addDays, format } from 'date-fns'
import getRealm from '../../services/realm'
import DateTimePicker from '@react-native-community/datetimepicker'

import ArrowLeft from '../../assets/arrow-left.svg'
import Send from '../../assets/send.svg'
import Clock from '../../assets/clockBig.svg'
import Calendar from '../../assets/calendar.svg'

const Add = () => {
  const [storaged, setStoraged] = useState({
    title: '',
    dateEnd: new Date(),
    seconds: 0
  })
  const [isTimeActived, setIsTimeActived] = useState(false)
  const [isDateActived, setIsDateActived] = useState(false)
  const [time, setTime] = useState(new Date())
  const [date, setDate] = useState(new Date())

  const navigation = useNavigation()

  function handleNavigateToDashboard() {
    navigation.navigate('Dashboard')
  }

  async function saveDatabase() {
    const realm = await getRealm()

    // Existe algum titulo?
    if(storaged.title === '') {
      return "Title not exist"
    }

    // Colocando como a primeira letra do título obrigatoriamente maiuscula
    const newTitle = storaged.title.trim()

    // O título do input, já existe?
    let result = realm.objects('ToDo').find(row => row.title === newTitle)

    if (result) {
      return "This title already exists"
    }

    // Transformando o time em seconds
    const newSeconds = (time.getHours() * 3600) + (time.getMinutes() * 60)

    
    realm.write(() => {
      realm.create('ToDo', {
        title: newTitle,
        dateInitial: new Date(),
        dateEnd: date,
        seconds: newSeconds
      })
    })

    return "Right";
  }

  async function handleSubmit() {
    try {

      const result = await saveDatabase()

      if(result !== "Right") {
        Alert.alert(result)
        return;
      }
    } catch (err) {
      Alert.alert(String(err))
    }

    navigation.navigate('Dashboard')
  }
  function handleTime() {
    setIsTimeActived(true)
  }

  function handleCalendar() {
    setIsDateActived(true)
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
              style={styles.textInputTitle} 
              maxLength={60}
              onChangeText={text => setStoraged({...storaged, title: text})}
            />
          </View>

          <View style={styles.date}>
            <Text style={styles.textTitle}>Date end</Text>
              <TouchableOpacity style={styles.calendar} onPress={handleCalendar}>
                <Calendar style={{ color: '#64DF18', marginLeft: 12}}/>
                <TextInput 
                  style={styles.textInputDate}
                  editable={false}
                  placeholder={format(date, 'dd/M/yyyy')}
                />
                { isDateActived && (
                  <DateTimePicker
                    minimumDate={new Date()}
                    testID="dateTimePicker"
                    value={date}
                    mode="date"
                    minuteInterval={10}
                    is24Hour={true}
                    display="default"
                    onChange={(event, date) => {
                      setIsDateActived(false) 
                      setDate(date)
                    }}
                />)}
              </TouchableOpacity>
          </View>

          <TouchableOpacity
            onPress={handleTime} 
            style={styles.timeContainer}
          >
            <Clock style={{ color: '#64DF18'}}/>
            <TextInput 
              style={styles.textInputTime} 
              editable={false}
              placeholder={`${time.getHours()}:${time.getMinutes()}`}
            />
            {isTimeActived && (
              <DateTimePicker
                testID="dateTimePicker"
                value={time}
                mode="time"
                minuteInterval={10}
                is24Hour={true}
                display="spinner"
                onChange={(event, date) => {
                  setIsTimeActived(false) 
                  setTime(date)
                }}
              />
            )}
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

  calendar: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 12
  },

  textInputDate: {
    marginLeft: 40,
    backgroundColor: '#EFEFEF',
    borderRadius: 8,
    padding: 8,
    flex: 1,
    textAlign: 'center',
    
    fontSize: 12,
    fontWeight: 'bold',
    color: '#3b3b3a'
  },

  textInputTitle: {
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