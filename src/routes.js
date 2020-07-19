import React from 'react'

import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator} from '@react-navigation/stack'

import Dashboard from './pages/Dashboard'
import Add from './pages/Add'
import Cronometro from './pages/Cronometro'

const AppStack = createStackNavigator()

const Routes = () => {
  return(
    <NavigationContainer>
      <AppStack.Navigator headerMode="none">
        <AppStack.Screen name="Dashboard" component={Dashboard} />
        <AppStack.Screen name="Add" component={Add} />
        <AppStack.Screen name="Cronometro" component={Cronometro} />
      </AppStack.Navigator>
    </NavigationContainer>
  )
}

export default Routes;