import React, { useEffect, useState } from 'react';
import { ActivityIndicator, StyleSheet, FlatList, Text, View, Image, ScrollView, SafeAreaView, Modal, TextInput, TouchableOpacity } from 'react-native';
import  SelectList  from 'react-native-dropdown-select-list'; 
import Slider from '@react-native-community/slider'; 

const App = () => {

  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const [nameData, setNameData] = useState([]); 
  const [carYear, setCarYear] = useState([]);
  const [carColor, setCarColor] = useState([]); 
  const [image, setImage] = useState([]);
  const [search, setSearch] = useState(''); 
  const [modal, setModal] = useState(false); 
  const [select, setSelected] = useState(""); // name of the car
  const [selectColor, setSelectedColor] = useState(""); // color of the car
  const [selectYear, setSelectedYear] = useState(""); // year of the car

  const [range, setRange] = useState("0"); 
  const random = Math.floor(Math.random() * (100 - 300 + 1) + 100);

  const dataDrop = [{
    key: '1', 
    value: 'Toyota',
  }, 
{
  key: '2', 
  value: 'Mitsubishi', 
}, 
{
  key: '3', 
  value: 'BMW'
},
{
  key: '3', 
  value: 'Audi'
}
]

  const getMovies = async () => {
     try {
      const response = await fetch('https://myfakeapi.com/api/cars/');
      const json = await response.json();
      var count = Object.keys(json.cars).length;

      let carNames = [];
      let carYear = [];  
      let carColor = [];
      let b = []; 
      for (var i = 0; i < count; i++) {
        
          carNames.push({
            value: json.cars[i].car
          });
         
        
        
        carYear.push({
          value: json.cars[i].car_model_year
        });
        carColor.push({
          value: json.cars[i].car_color
        })
      }
      console.log(setSelected);
   
      setNameData(carNames); 
      setCarYear(carYear);
      setData(json.cars);
      setCarColor(carColor); 
    } catch (error) {
      console.error(error);
     alert(error);
    } finally {
      setLoading(false);
      setModal(false);
    }
  }


  const searchFilter = async (text) => {
    if (text) { 
      const newData = data.filter((item) => {
        const itemData = item.car ? item.car.toUpperCase() : ''.toUpperCase(); 
        const textData = text.toUpperCase();
        return itemData.indexOf(textData) > -1;
      });
      setData(newData);
      setSearch(text);
    }
    else {
      const response = await fetch('https://myfakeapi.com/api/cars/');
      const json = await response.json();
      setData(json.cars);
      setSearch(text);
    }
  }
  const advancedFilterYear = async () => {
    const response = await fetch(`https://myfakeapi.com/api/cars/year/${selectYear}?q=lt`); 
    const json = await response.json(); 
    setData(json.Cars); 
  

      // const newData = data.filter((item) => {
      //   return item.car === select ?? item.car_color === selectColor; 
       
      // });
      // setData(newData); 
     
    
   
    
  }

  const advancedFilterName = async () => {
    const response = await fetch(`https://myfakeapi.com/api/cars/name/${select}`); 
    const json = await response.json(); 
    setData(json.Cars); 
  

      // const newData = data.filter((item) => {
      //   return item.car === select ?? item.car_color === selectColor; 
       
      // });
      // setData(newData); 
     
    
   
    
  }

  const advancedFilterColor = async () => {
    const response = await fetch(`https://myfakeapi.com/api/cars/color/${selectColor}`); 
    const json = await response.json(); 
    setData(json.Cars); 
    
  }
const applyAllFilters = () => {
  const newData = data.filter((item) => {
    if (item.car != select && item.car_color != selectColor && item.car_model_year != selectYear) {
      alert("Please select all 3 filters"); 
      
    }
    else {

      return item.car === select && item.car_color === selectColor && item.car_model_year == selectYear; 
    }

      
      });
      setData(newData); 
     setModal(false);
}



  useEffect(() => {
    getMovies();


  }, []);

  return (
    <View style={{ flex: 1, padding: 24, width: '100%', backgroundColor: '#f1f1f1' }}>
      <View style={{ marginTop: 30}}>

        <TextInput style={styles.input} placeholder="Search..." value={search} onChangeText={(text) => searchFilter(text)} />
        <TouchableOpacity onPress={() => setModal(true)} style={styles.filters}><Text style={{textAlign: 'center', fontSize: 18, color: 'white'}}>Filters</Text></TouchableOpacity>
    <Modal style={{}} visible={modal} animationType='slide'>
      <ScrollView style={{margin: 20, padding: 20}}>
        <Text onPress={() => setModal(false)} style={{fontSize: 30, textAlign: 'right'}}>X</Text>
        <Text style={styles.filter}>Advanced Filters</Text>
        <View style={[styles.shadowProp, styles.card]}>

       
        <Text style={{marginTop: 30, fontSize: 22, paddingBottom: 10}}>Filter by car make: </Text>
       <SelectList data={nameData} setSelected={setSelected} onSelect={advancedFilterName} />
       <TouchableOpacity onPress={() => setModal(false)} style={styles.apply}><Text style={{textAlign: 'center', fontSize: 18, color: 'white'}}>Apply Individually</Text></TouchableOpacity>
      
       <Text style={{marginTop: 30, fontSize: 22, paddingBottom: 10}}>Filter by car year:</Text>
         <SelectList data={carYear} setSelected={setSelectedYear} onSelect={advancedFilterYear}/>
         <TouchableOpacity onPress={() => setModal(false)} style={styles.apply}><Text style={{textAlign: 'center', fontSize: 18, color: 'white'}}>Apply Individually</Text></TouchableOpacity>
      
         <Text style={{marginTop: 30, fontSize: 22, paddingBottom: 10}}>Filter by car price: {range}</Text>
         <Slider maximumValue={1} minimumValue={0} setSelected={setRange} onValueChange={value => setRange(parseInt(value * 4000))} />
         
         <Text style={{marginTop: 30, fontSize: 22, paddingBottom: 10}}>Filter by car color:</Text>
       <SelectList data={carColor} setSelected={setSelectedColor} onSelect={advancedFilterColor} />
       <TouchableOpacity onPress={() => setModal(false)} style={styles.apply}><Text style={{textAlign: 'center', fontSize: 18, color: 'white'}}>Apply Individually</Text></TouchableOpacity>
      
       <View
  style={{
    borderBottomColor: 'black',
    borderBottomWidth: StyleSheet.hairlineWidth,
    marginTop: 30
  }}
/>
       <TouchableOpacity onPress={applyAllFilters} style={styles.save}><Text style={{textAlign: 'center'}}>Save</Text></TouchableOpacity>
       <TouchableOpacity onPress={getMovies} style={styles.clear}><Text style={{textAlign: 'center'}}>Clear</Text></TouchableOpacity>
       </View>
      </ScrollView>
    </Modal>
   
    </View>
      {isLoading ? <Text>No cars available with these filters...</Text> : (
        <FlatList
          data={data}
          keyExtractor={({ id }, index) => id}
          renderItem={({ item }) => (
    
            <View style={{backgroundColor:'white', borderRadius: 10, marginTop: 20}}>
            <Text style={{marginTop: 50, textAlign: 'center', fontSize: 26, color: 'grey', fontWeight: '700'}}>{item.car} {item.car_model}</Text>
            <Text style={{textAlign: 'center'}}></Text>
            <Text style={{fontSize: 20}}>{item.availability ? (<Text style={{color: 'green', textAlign: 'center'}}>available</Text>): (<Text style={{color: 'red', textAlign: 'center'}}>not available</Text>)}</Text>
            <Text style={{textAlign:'center', marginTop: 13, fontWeight: '700', fontSize: 17}}>{item.car_color}</Text>
            <Text style={{textAlign:'center', marginTop: 13, fontWeight: '700', fontSize: 17}}>{item.price}/day</Text>
            <Text style={{textAlign:'center', marginTop: 13, fontWeight: '700', fontSize: 17}}>{item.car_model_year}</Text>
            <View
              style={{
                borderBottomColor: 'black',
                borderBottomWidth: StyleSheet.hairlineWidth,
                marginTop: 10, 
                paddingBottom: 10
                }}
              />
            <Image style={styles.logo} source={{uri : `https://picsum.photos/200/300`}} />
            </View>
          )}
        />

        
      )}


    </View>
    

    
  );
  
};

const styles = StyleSheet.create({
  input: {
    borderColor: 'black', 
    borderWidth: 0.4, 
    padding: 13, 
    margin: 20,
    borderRadius: 20
  },
  save: {
    backgroundColor: '#eb914d',
    textAlign: 'center',
    fontSize: 17,
    paddingTop: 8,
    paddingBottom: 8,
    width: '100%',
    marginTop: 30,
    borderRadius: 10, 


  }, 
  filters: {
    backgroundColor: '#eb914d',
    textAlign: 'center',
    fontSize: 17,
    paddingTop: 8,
    paddingBottom: 8,
    width: '100%',
    marginTop: 1,
    borderRadius: 30, 


  }, 
clear: {
  backgroundColor: '#fff', 
  borderColor: 'black', 
  borderWidth: 1, 
  paddingTop: 8,
  paddingBottom: 8,
  borderRadius: 40, 
  marginTop: 10


},
  filter: {
    textAlign: 'center', 
    fontSize: 30
  }, 
  logo: {
    justifyContent: 'center',
    marginTop: 16,
    alignItems: 'center',
    borderRadius: 10,
    width: '100%', 
    height: 200, 
 
  },
  shadowProp: {
    shadowColor: '#171717',
    shadowOffset: {width: 1, height: 4},
    shadowOpacity: 0.2,
    shadowRadius: 7,
  },
  card: {
    backgroundColor: 'white',
    borderRadius: 8,
    paddingVertical: 45,
    paddingHorizontal: 25,
    width: '100%',
    marginVertical: 10,
  }, 
  apply: {
    backgroundColor: '#100eab',
    textAlign: 'center',
    fontSize: 17,
    paddingTop: 8,
    paddingBottom: 8,
    width: '100%',
    borderRadius: 10, 
    marginTop: 10

  }
  


})
export default App;