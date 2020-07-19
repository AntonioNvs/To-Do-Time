import React from 'react';
import { StatusBar } from 'react-native'

import Routes from './src/routes'

const App = () => {
  
  return (
    <> 
      <StatusBar 
        backgroundColor="#64DF18"
        translucent
      />
      <Routes />
    </>
  );
};

export default App;
