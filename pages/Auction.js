import React,{useState} from 'react'
import { 
    StyleSheet, 
    Text, 
    View,
    Image,
    Dimensions,
    TextInput,
    TouchableOpacity,
    SafeAreaView } from 'react-native';
import Header from '../components/Header/Header'
import Footer from '../components/Footer/Footer'
import btc from '../assets/currency/BTC.png'
import eth from '../assets/currency/ETH.png'
import xrp from '../assets/currency/XRP.png'
import trx from '../assets/currency/tron.png'
import ltc from '../assets/currency/LTC.png'
import xlm from '../assets/currency/XLM.png'
import up from '../assets/transfer.png'
import AsyncStorage from '@react-native-async-storage/async-storage';

const windowHeight = Dimensions.get('window').height;

const Auction = (props) => {
    const {navigation,currency,setCurrency} = props
    const [choose,setChoose] = useState('')
    const [text, setText] = useState('0');
    const [mess,setMess] = useState('You must selected currency');

    const currencyAvailable = [
        {name: 'BTC', imag: btc},
        {name: 'ETH', imag: eth},
        {name: 'LTC', imag: ltc},
        {name: 'TRX', imag: trx},
        {name: 'XLM', imag: xlm},
        {name: 'XRP', imag: xrp},
    ]

    const chooseCurrency = (name) => { 
        setChoose(name)
        setText(currency[name].price)
    }

    const startGame = async (choose,price,currencyCoin) => {
        const userChoose = choose === 'down' ? 0 : 1
        const randomRisk = Math.floor(Math.random()*2)
        if(parseInt(currency[currencyCoin].price) !== 0){
            if(randomRisk === userChoose){
                setMess('YOU WIN')
                currency[currencyCoin].price = currency[currencyCoin].price * 2
                await AsyncStorage.setItem('currencyApp', JSON.stringify(currency))
                setText('0')
                setChoose('')
            }else{
                setMess('YOU LOSE')
                currency[currencyCoin].price = 0
                await AsyncStorage.setItem('currencyApp', JSON.stringify(currency))
                setText('0')
                setChoose('')
            }
        }else{

        }
    }

    return(
        <SafeAreaView>
        <Header/>
            <View style={styles.mainMainerContainer}>
                <Text style={styles.title}>Auction</Text>
                <Text style={{color:'white',fontSize:15,marginBottom:5}}>You selected: {choose? choose: '-'}</Text>
                <View style={{flexDirection:'row',justifyContent:'center'}}>
                {currencyAvailable.map((el,key) => 
                <TouchableOpacity onPress={() => chooseCurrency(el.name)}>
                    <View style={{margin:5,padding:6,borderWidth: 1,borderColor: 'white',alignItems:'center',maxWidth:60}}>
                        <Image source={el.imag} style={{marginBottom:5}}/>
                        <Text style={{
                            color:'white',
                            fontSize:20,
                            fontWeight:'bold'
                            }}>{el.name}</Text>
                        <Text style={{
                            color:'white',
                            textAlign:'center'}}>
                            {String(currency[el.name].price).length > 4 ? 
                            `${String(currency[el.name].price).slice(0,4)}...` : 
                            currency[el.name].price}
                        </Text>
                    </View>
                </TouchableOpacity>)}
                </View>

                <Text style={styles.upordown}>UP or DOWN</Text>
                <View style={{alignItems:'center',marginTop: 30}}>
                    <Image 
                    source={up} 
                    style={{width: 70,height:70}}/>
                </View>
                    <View style={{justifyContent:'center',alignItems:'center'}}>
                <Text
                    style={{
                        marginTop: 15,
                        width: 150,
                        padding: 10,
                        borderWidth:1,
                        borderColor:'white',
                        color:'white'
                    }}>{text}</Text>
                    </View>
                    <Text style={{
                        color:'white',
                        marginTop:10,
                        textAlign:'center',
                        fontSize:15}}>{mess}</Text>
                <View style={{flexDirection:'row',justifyContent:'center',marginTop:20}}>
                    <TouchableOpacity onPress={() => startGame('up',text,choose)}>
                        <Text style={styles.btnup}>UP</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => startGame('down',text,choose)}>
                        <Text style={styles.btndown}>DOWN</Text>
                    </TouchableOpacity>
                </View>
            </View>
        <Footer navigation={navigation}/>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    mainMainerContainer: {
      position:'relative',
      display: 'flex',
      backgroundColor: "#131321",
      height: "80%"
      //windowHeight-140
    },
    title:{
        margin: 20,
        fontSize: 30,
        textTransform: 'uppercase',
        fontWeight: 'bold',
        color: 'white'
    },
    upordown:{
        fontSize:25,
        color:'white',
        textAlign:'center',
        marginTop: 20,
        fontWeight:'bold'
    },
    btnup:{
        color:'white',
        margin:10,
        backgroundColor:'green',
        width: 100,
        textAlign:'center',
        padding:10,
        fontWeight:'bold'
    },  
    btndown:{
        color:'white',
        backgroundColor:'red',
        margin:10,
        width: 100,
        textAlign:'center',
        padding:10,
        fontWeight:'bold'
    }
  });


export default Auction