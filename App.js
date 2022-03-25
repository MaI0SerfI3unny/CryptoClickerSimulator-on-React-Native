import React,{useState,useEffect} from 'react'
import Home from './pages/Home'
import Exchange from './pages/Exchange'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Auction from './pages/Auction';
import Shop from './pages/Shop';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Stack = createNativeStackNavigator();

export default function App() {
  const [money,setMoney] = useState(0)
  const [autoMoney,setAutoMoney] = useState(0)
  const [currency,setCurrency] = useState({})

 // console.log(currency)

  const getData = async () => {
    try {
      const value = await AsyncStorage.getItem('priceApp')
      const autoValue = await AsyncStorage.getItem('autoApp')
      const currencyValue = await AsyncStorage.getItem('currencyApp')
      if(value !== null && autoValue !== null && currencyValue !== null) {
        setMoney(JSON.parse(value))
        setAutoMoney(JSON.parse(autoValue))
        setCurrency(JSON.parse(currencyValue))
      }else{
        const jsonValue = JSON.stringify(0)
        const currencyStorage =  JSON.stringify({
          BTC:{price:0},
          ETH:{price:0},
          XRP:{price:0},
          TRX:{price:0},
          LTC:{price:0},
          XLM:{price:0}
        })
        await AsyncStorage.setItem('priceApp', jsonValue)
        await AsyncStorage.setItem('autoApp', jsonValue)
        await  AsyncStorage.setItem('currencyApp', currencyStorage)
      }
    } catch(e) {}
  }


  useEffect(() => {getData()},[])

  return (
    <NavigationContainer>
    <Stack.Navigator 
    screenOptions={{
    headerShown: false
  }}>
      <Stack.Screen name="Home">
      {props => <Home 
      {...props}
      autoMoney={autoMoney} 
      setMoney={setMoney} 
      money={money} />}
      </Stack.Screen>
      <Stack.Screen name="Exchange">
      {props => 
      <Exchange 
      {...props}
      currencyStore={currency}
      setCurrencyStore={setCurrency}
      setPrice={setMoney}
      price={money} />}
      </Stack.Screen>
      <Stack.Screen name="Auction">
      {props => 
      <Auction 
      {...props}
      currency={currency}
      setCurrency={setCurrency} 
      />}
      </Stack.Screen>
      <Stack.Screen name="Shop">
      {props => 
      <Shop 
      {...props} 
      setPrice={setMoney}
      setAutoMoney={setAutoMoney}
      autoMoney={autoMoney}
      price={money} />}
      </Stack.Screen>
    </Stack.Navigator>
  </NavigationContainer>
  );
}


