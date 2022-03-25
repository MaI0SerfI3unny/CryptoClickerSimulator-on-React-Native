import React,{useState,useEffect} from 'react'
import { 
    StyleSheet, 
    Text, 
    View,
    Dimensions,
    SafeAreaView,
    FlatList } from 'react-native';
import Header from '../components/Header/Header'
import Footer from '../components/Footer/Footer'
import {getCurrency} from '../api/api.js'
import btc from '../assets/currency/BTC.png'
import eth from '../assets/currency/ETH.png'
import xrp from '../assets/currency/XRP.png'
import trx from '../assets/currency/tron.png'
import ltc from '../assets/currency/LTC.png'
import xlm from '../assets/currency/XLM.png'
import ExchangeItem from '../components/ExchangeItem/ExchangeItem';
import AsyncStorage from '@react-native-async-storage/async-storage';

const windowHeight = Dimensions.get('window').height;


const Exchange = (props) => {
    const {navigation,price,currencyStore,setCurrencyStore,setPrice} = props
    const [currency,setCurrency] = useState([])
    const [value, onChangeText] = useState('');
    useEffect(() =>{getCurrency(setCurrency)},[])

    const currencyArr = [
        {name: "BTC", price: currency? currency["BTC"] : 0, imag: btc},
        {name: "ETH", price: currency? currency["ETH"] : 0, imag: eth},
        {name: "XRP", price: currency? currency["XRP"] : 0, imag: xrp},
        {name: "TRX", price: currency? currency["TRX"] : 0, imag: trx},
        {name: "LTC", price: currency? currency["LTC"] : 0, imag: ltc},
        {name: "XLM", price: currency? currency["XLM"] : 0, imag: xlm}
    ]

    const buyCurrency = async (currency,valueMinus,tokenUpdate) => {
        const newCurrency = currencyStore 
        newCurrency[currency].price =  currencyStore[currency].price + tokenUpdate
        setPrice(price - valueMinus)
        await AsyncStorage.setItem('currencyApp', JSON.stringify(newCurrency))
        await AsyncStorage.setItem('priceApp', JSON.stringify(price - valueMinus))
    }

  //  console.log(currency)
    return(
        <SafeAreaView>
        <Header/>
            <View style={styles.mainMainerContainer}>
                <Text style={styles.title}>Exchange</Text>
                <FlatList
        data={currencyArr}
        renderItem={({item}) => 
        <ExchangeItem 
        price={price} 
        buyCurrency={buyCurrency}
        item={item}/>}
        />
        </View>
        <Footer navigation={navigation}/>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    mainMainerContainer: {
      position:'relative',
      display: 'flex',
      padding: 10,
      backgroundColor: "#131321",
      height: "80%"
    },
    title:{
        margin: 20,
        fontSize: 30,
        textTransform: 'uppercase',
        fontWeight: 'bold',
        color: 'white'
    }
  });

export default Exchange