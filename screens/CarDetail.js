import React from 'react';
import { Share, StyleSheet, Image, Text, View, TouchableOpacity } from 'react-native';

const CarDetail = ({ navigation, route }) => {
    
    const { name, model, year, vin, price, available, color } = route.params; // catches data from each card 
   const shareCar = async ()  => {
       try {
           await Share.share({
         
               message: `${year} ${name} ${model}`, 
               // car URL link will go HERE for sharing purposes
            //    url: 'https://www.youtube.com/watch?v=QmdE6bLtuc4',
           });
       } catch (err) {
           alert(err.message);
       }
   }

return (
    
    <View style={styles.description}>
       <Image style={styles.logo} source={{uri : `https://picsum.photos/200/300`}} />
           <TouchableOpacity style={styles.share} onPress={shareCar}><Text>share</Text></TouchableOpacity>
           <View style={{padding: 20}}>
              
             <Text style={{ marginTop: 30, fontSize: 24, fontWeight: '600'}}>{year} {name} {model}</Text>
      
           
             <Text style={{ marginTop: 10, fontSize: 18, fontWeight: '700'}}>{price}/day</Text>
             <View
              style={{
                borderBottomColor: 'black',
                borderBottomWidth: StyleSheet.hairlineWidth,
                marginTop: 15, 
                paddingBottom: 10
                }}
              />
             { available  // if the car is available then shows available in green
             ? ( <Text style={styles.av}>available today</Text> ) 
                :         // if not available, shows in red
             ( <Text style={styles.notAv}>not available today</Text>
                )}
               
             <Text style={{ marginTop: 20, fontSize: 15, fontWeight: '600'}}>VIN #: {vin}</Text>
             <Text style={{ marginTop: 25, fontWeight: '800'}}>Description</Text>
             <Text style={{  marginTop: 6,fontSize: 15, fontWeight: '500'}}>{color} {year} {name} {model} in great condition for only {price}/day. Book now to enjoy the ride!</Text>
            <TouchableOpacity onPress={() => alert("Please login or sign up to continue")} style={styles.book}><Text style={{color: 'white', textAlign: 'center'}}>Book Now</Text></TouchableOpacity>
            </View>

             
    
    </View>
    )
  
 };

// stylesheet for the UI 

const styles = StyleSheet.create({
    
    description: { 
        flex: 1,
     
    },
    share: {
        position: 'absolute', 
        padding: 10,
        right: 20,
        top: 10,
        backgroundColor: 'white', 
        borderRadius: '100%'


    },
    book: {
        marginTop: 20, 
        backgroundColor: 'black',
        width: 100,
        padding: 10

    },
    title: {
        color: 'black', 
     
        fontWeight: '600',
  
     
    },
    header: {
        color: 'black',
        fontSize: 33, 
        fontWeight: '700',
        textAlign: 'center', 
      
    },
    av: {
        color: 'green', 
        fontSize: 32,
        marginTop: 15
        
       
    },
    notAv: {
        color: 'red', 
        fontSize: 32,
        marginTop: 15
       
      
    },
    logo: {
       
       paddingBottom: 30,
        width: '100%', 
        height: 320
    }
  


})
export default CarDetail;