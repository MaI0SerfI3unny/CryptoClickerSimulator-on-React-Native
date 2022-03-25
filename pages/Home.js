import React,{useState,useEffect} from 'react'
import { 
  StyleSheet, 
  Text, 
  View,
  Image,
  Dimensions,
  SafeAreaView } from 'react-native';
import Header from '../components/Header/Header'
import Footer from '../components/Footer/Footer'
import mainer from '../assets/tether.png'
import worker from '../assets/gifWorker.gif'
import AsyncStorage from '@react-native-async-storage/async-storage';


const windowHeight = Dimensions.get('window').height;


const Home = (props) => {
  const {navigation,money,setMoney,autoMoney} = props
  const [active,setActive] = useState(false) 

  const startMining = async () => {
    setMoney(autoMoney+money+1)
    setActive(true)
    const jsonValue = JSON.stringify(money+1)
    await AsyncStorage.setItem('priceApp', jsonValue)
  }

  useEffect(() => {
    if(active){
      function stopMining(){
        setActive(false)
      }
      setTimeout(stopMining,4000)
    }
  },[active])

    return(
        <SafeAreaView>
        <Header/>
        <View style={styles.mainMainerContainer}>
        <View style={{width: '100%'}}>
          <Image style={{
            opacity: active ? 0.6 : 0,
            position:"absolute",
            width: '100%',
            height: windowHeight-205
            }} source={worker}/>
          </View>
          <Text style={styles.welcome}>Let`s start mining</Text>
         <Image style={{width: 200, height: 200}} source={mainer}/>
          <Text style={styles.textPrice}>{money.toFixed(2)}$</Text>
          <Text style={styles.btnMining} onPress={() => startMining()}>Click!</Text>
        </View>
       <Footer navigation={navigation}/>
      </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    mainMainerContainer: {
      position:'relative',
      justifyContent: 'center',
      alignItems:"center",
      display: 'flex',
      backgroundColor: "#131321",
      height: "80%"
      //windowHeight-140
    },
    btnMining:{
      width: 140,
      padding:10,
      marginBottom: 40,
      marginTop: 50,
      textTransform:'uppercase',
      backgroundColor:'white',
      textAlign:'center',
      fontWeight: 'bold',
      display:'flex',
      alignItems:'center'
    },
    textPrice:{
      marginTop: 20,
      fontSize:40,
      fontWeight:'bold',
      color:'white'
    },
    welcome:{
      fontSize:30,
      marginTop:40,
      fontWeight:'bold',
      textTransform:'uppercase',
      color:'white',
      marginBottom: 40
    },
  });

export default Home