import React, { useEffect, useState } from 'react';
import { ActivityIndicator, StyleSheet, FlatList, Text, View, Image, ScrollView, SafeAreaView, Modal, TextInput, TouchableOpacity } from 'react-native';
import  SelectList  from 'react-native-dropdown-select-list'; 
import Slider from '@react-native-community/slider';
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
      <Stack.Screen name="Details" titl component={CarDetail} />
     
    </Stack.Navigator>
  </NavigationContainer>
    

    
  );
  
};


export default App;