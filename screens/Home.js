import React, { useEffect, useState } from 'react';
import { StyleSheet, FlatList, Text, View, Image, ScrollView, Modal, TextInput, TouchableOpacity } from 'react-native';
import  SelectList  from 'react-native-dropdown-select-list'; 
import Slider from '@react-native-community/slider';


const Home = ({ navigation }) => {

  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const [nameData, setNameData] = useState([]); 
  const [carYear, setCarYear] = useState([]);
  const [carColor, setCarColor] = useState([]); 
  const [carVin, setCarVin] = useState([]);  
  const [search, setSearch] = useState(''); 
  const [modal, setModal] = useState(false); // open or close filter modal 
  const [select, setSelected] = useState(""); // name of the car
  const [selectColor, setSelectedColor] = useState(""); // color of the car
  const [selectYear, setSelectedYear] = useState(""); // year of the car
  const [selectPrice, setSelectPrice] = useState(""); // price of the car / daily rate
 

  const [range, setRangeMin] = useState("");    // slider min
  const [rangeMax, setRangeMax] = useState("");     // slider max
  
  let listViewRef; // scroll to top

  const getMovies = async () => {
     try {
      const response = await fetch('https://myfakeapi.com/api/cars/');
      const json = await response.json();
      var count = Object.keys(json.cars).length;

      let carNames = [];
      let carYear = [];  
      let carColor = [];
      let carVin = []; 
    
      
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
       
        carVin.push({
            value: json.cars[i].car_vin
        })

      }
    

        // assign vars 
      setNameData(carNames); 
      setCarYear(carYear);
      setData(json.cars);
      setCarColor(carColor); 
      
      setCarVin(carVin);
      
    } catch (error) {
      console.error(error);
     alert(error);
    } finally {
      setLoading(false);  // set loading off
      setModal(false);  // close modal 
    }
  }


  const searchFilter = async (text) => {
    if (text) { 
      const newData = data.filter((item) => {
        const itemData = item.car ? item.car.toUpperCase() : ''.toUpperCase(); // 
        const textData = text.toUpperCase();
        return itemData.indexOf(textData) > -1;
      });
      setData(newData); // assign new output of the search to data
      setSearch(text);  // set search to text
    }
    else {  // if text is erased set data to previous output
      const response = await fetch('https://myfakeapi.com/api/cars/');
      const json = await response.json();
      setData(json.cars);
      setSearch(text);
    }
  }
  const advancedFilterYear = async () => {

      // filter years based on range sliders ( FROM: minimum TO: maximum )
    const response = await fetch(`https://myfakeapi.com/api/cars/year/${range}?q=gt&${rangeMax}?q=lt`); 
    const json = await response.json(); 
    console.log(range, rangeMax)
    setData(json.Cars); // asign output with appropriate dates to data output
    setModal(false);    // close modal 

  }

  const advancedFilterName = async () => {
      // filter name based on selection in filter section
    const response = await fetch(`https://myfakeapi.com/api/cars/name/${select}`); 
    const json = await response.json(); 
    setData(json.Cars); 
    setModal(false); 

  }

  const advancedFilterColor = async () => {
      // filter color based on selection in filter section
    const response = await fetch(`https://myfakeapi.com/api/cars/color/${selectColor}`); 
    const json = await response.json(); 
    setData(json.Cars);
    setModal(false); 
    
  }
const applyAllFilters = () => {

  const newData = data.filter((item) => {
      // if all filters are not correct or missing, throw alert
    if (item.car != select && item.car_color != selectColor && item.car_model_year != selectYear) {
      alert("Please select all 3 filters"); 
      
    }
    else {
        // all filters must be accurate
      return item.car === select && item.car_color === selectColor && item.car_model_year == range; 
    }

      
      });
      setData(newData); 
      setModal(false);
}
const advancedFilterPrice = () => {
 
  const newData = data.filter((item) => {
    if (parseInt(item.price) <= range) {
        return parseInt(item.price) == range; 
    }
     else {
       alert("Price not working")
     }
    
    });

  setData(newData); 
  setModal(false);
  
}

const TopButtonHandler = () => {
  listViewRef.scrollToOffset({offset: 0, animated: true}); // scrolls to the top of the page
}


  useEffect(() => {
    getMovies(); // outputs data when app is loaded


  }, []);

  return (
    <View style={{ flex: 1, padding: 24, width: '100%', backgroundColor: '#e7e7e7' }}>
      <View style={{ marginTop: 30}}>

        <TextInput style={styles.input} placeholder="Search..." value={search} onChangeText={(text) => searchFilter(text)} />
        <TouchableOpacity onPress={() => setModal(true)} style={styles.filters}><Text style={{textAlign: 'center', fontSize: 18, color: 'white'}}>Filters</Text></TouchableOpacity>
    <Modal style={{}} visible={modal} animationType='slide'>
      <ScrollView style={{margin: 20, padding: 20}}>
        <Text onPress={() => setModal(false)} style={{fontSize: 30, textAlign: 'right'}}>X</Text>
        <Text style={styles.filter}>Advanced Filters</Text>
        <View style={[styles.shadowProp, styles.card]}>

       
        <Text style={{marginTop: 10, fontSize: 18, paddingBottom: 10}}>Filter by car make: </Text>
       <SelectList data={nameData} setSelected={setSelected} />
       <TouchableOpacity onPress={advancedFilterName} style={styles.apply}><Text style={{textAlign: 'center', fontSize: 18, color: 'white'}}>Apply Filter</Text></TouchableOpacity>
      
       <Text style={{marginTop: 30, fontSize: 18, paddingBottom: 10}}>Filter by year (min-max): {range} - {rangeMax}</Text>
       <Slider maximumValue={1} minimumValue={0} setSelected={setRangeMin} onSelect={selectYear} onValueChange={value => setRangeMin(parseInt(value * 2022))} />
       <Slider maximumValue={1} minimumValue={0} setSelected={setRangeMax} onValueChange={value => setRangeMax(parseInt(value * 2022))} />
         <TouchableOpacity onPress={advancedFilterYear} style={styles.apply}><Text style={{textAlign: 'center', fontSize: 18, color: 'white'}}>Apply Filter</Text></TouchableOpacity>
         
        
         <Text style={{marginTop: 30, fontSize: 18, paddingBottom: 10}}>Filter by car color:</Text>
       <SelectList data={carColor} setSelected={setSelectedColor} />
       <TouchableOpacity onPress={advancedFilterColor} style={styles.apply}><Text style={{textAlign: 'center', fontSize: 18, color: 'white'}}>Apply Filter</Text></TouchableOpacity>
      
       <View
  style={{
    borderBottomColor: 'black',
    borderBottomWidth: StyleSheet.hairlineWidth,
    marginTop: 30
  }}
/>
       <TouchableOpacity onPress={applyAllFilters} style={styles.save}><Text style={{textAlign: 'center'}}>Apply All</Text></TouchableOpacity>
       <TouchableOpacity onPress={getMovies} style={styles.clear}><Text style={{textAlign: 'center'}}>Clear</Text></TouchableOpacity>
       </View>
      </ScrollView>
    </Modal>
   
    </View>
    <View>
      {isLoading ? <Text>No cars available with these filters...</Text> : (
        <FlatList
          data={data}
          keyExtractor={({ id }, index) => id}
          ref={(ref) => {
            listViewRef = ref; 
          }}
        
          renderItem={({ item }) => (
            <TouchableOpacity onPress={() => navigation.navigate('Details',  {name: item.car, year: item.car_model_year, vin: item.car_vin, price: item.price, model: item.car_model, available: item.availability} )}>
            <View style={[styles.shadowProp, styles.carCard]}>
            <Text style={{marginTop: 50, textAlign: 'center', fontSize: 26, color: 'grey', fontWeight: '700'}}>{item.car} {item.car_model}</Text>
            <Text style={{textAlign: 'center'}}></Text>
            <Text style={{fontSize: 20}}>{item.availability ? (<Text style={{color: 'green', textAlign: 'center'}}>available</Text>) : (<Text style={{color: 'red', textAlign: 'center'}}>not available</Text>)}</Text>
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
            </TouchableOpacity>
          )}
        
          
        />

        
      )}

        </View>
        <TouchableOpacity onPress={TopButtonHandler} style={[styles.topBtn, { right: 30, bottom: 40}]}><Text style={{fontSize: 50, top: 4, left: 1, color: 'white'}}>^</Text></TouchableOpacity>

    </View>
    

    
  );
  
};

const styles = StyleSheet.create({
  input: {
    borderColor: 'black', 
    borderWidth: 0.4, 
    padding: 13, 
    margin: 10,
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
  carCard: {
    shadowColor: '#171717',
    shadowOffset: {width: 1, height: 4},
    shadowOpacity: 0.2,
    shadowRadius: 7,
    backgroundColor: 'white',
    borderRadius: 8,
    marginTop: 50
    
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

  },
  topBtn: {
    position: 'absolute', 
    height: 55, 
    width: 50, 
    alignItems: 'center', 
    justifyContent: 'center', 
    backgroundColor: '#e8b864',
    borderRadius: '100%',
    opacity: 0.5

  }
  


})
export default Home;