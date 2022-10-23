import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home  from './screens/Home'
import CarDetail from './screens/CarDetail';

const Stack = createNativeStackNavigator();
const App = ({ navigation }) => {

  return (
    <NavigationContainer>
    <Stack.Navigator initialRouteName="Home">
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen name="Details" component={CarDetail} />
     
    </Stack.Navigator>
  </NavigationContainer>
    

    
  );
  
};


export default App;