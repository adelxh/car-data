import React from 'react';
import { StyleSheet, ImageBackground, Text, View } from 'react-native';

const CarDetail = ({ navigation, route }) => {
    
    const { name, model, year, vin, price, available } = route.params; // catches data from each card 
   

return (
    
    <View style={styles.description}>
       <ImageBackground resizeMode="cover" style={styles.logo} source={{uri : `https://picsum.photos/200/300`}}>
            <Text style={styles.header}>FULL CAR DETAIL</Text>
             <Text style={styles.title}>{name} {model}</Text>
             <Text style={styles.title}>{year}</Text>
             <Text style={styles.title}>{vin}</Text>
             <Text style={styles.title}>{price}/day</Text>
             { available  // if the car is available then shows available in green
             ? ( <Text style={styles.av}>available</Text> ) 
                :         // if not available, shows in red
             ( <Text style={styles.notAv}>not available</Text>
                )}

             

             </ImageBackground>
    
</View>
)
  
};

// stylesheet for the UI 

const styles = StyleSheet.create({
    
    description: { 
        flex: 1
       
      
    },
    title: {
        color: 'white', 
        fontSize: 24,
        fontWeight: '600',
        textAlign: 'center', 
        backgroundColor: '#000000c0', 
        padding: 12
    },
    header: {
        color: 'white',
        fontSize: 33, 
        fontWeight: '700',
        textAlign: 'center', 
        backgroundColor: '#1c1c1c',
        padding: 20
    },
    av: {
        color: 'green', 
        fontSize: 32,
        textAlign: 'center', 
        backgroundColor: '#000000c0', 
        padding: 12
    },
    notAv: {
        color: 'red', 
        fontSize: 32,
        textAlign: 'center', 
        backgroundColor: '#000000c0', 
        padding: 12
    },
    logo: {
        flex: 1, 
        justifyContent: 'center'
    }
  


})
export default CarDetail;