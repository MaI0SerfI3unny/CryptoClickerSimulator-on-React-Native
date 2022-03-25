import React from 'react'
import { 
    StyleSheet, 
    Text, 
    View,
    Image,
    Dimensions,
    TouchableOpacity,
    SafeAreaView } from 'react-native';
import Header from '../components/Header/Header'
import Footer from '../components/Footer/Footer'
import click from '../assets/shop/click.png'
import AsyncStorage from '@react-native-async-storage/async-storage';
import {storage} from '../storage/storage.js'

const windowHeight = Dimensions.get('window').height;


const Shop = (props) => {
    const {navigation,price,setPrice,setAutoMoney,autoMoney} = props
    const updateAutoEarn = async (item,currentPrice) => {
        if(price > currentPrice){
            setAutoMoney(autoMoney+item)
            setPrice(price - currentPrice)
            const jsonValue = JSON.stringify(autoMoney)
            const jsonValueMoney = JSON.stringify(price - currentPrice)
            await AsyncStorage.setItem('autoApp', jsonValue)
            await AsyncStorage.setItem('priceApp', jsonValueMoney)
        }
    }
    return(
        <SafeAreaView>
        <Header/>
            <View style={styles.mainMainerContainer}>
            <Text style={styles.title}>Shop</Text>
            {storage.shop.map((el,key) => 
                  <View key={key} style={{flexDirection:'row', margin:20,display:'flex',alignItems:'center'}}>
                  <Image style={{width: 50, height: 50,backgroundColor: 'white'}} source={el.image}/>
                  <Text style={styles.itemTitle}>{el.name}</Text>
                  <Text style={styles.itemTitle}>+{el.earn} $</Text>
                  <TouchableOpacity onPress={() => updateAutoEarn(el.earn,el.priceCurrent)}>
                  <Text style={{
                        color: 'white',
                        fontSize: 15,
                        padding:10,
                        marginLeft: 20,
                        backgroundColor: price >= el.priceCurrent ?'green':'grey',
                        alignItems:'center',
                        justifyContent:'center',
                        alignContent:'center',
                        textAlign:'center'
                    }}>- {el.priceCurrent}$</Text>
                  </TouchableOpacity>
              </View>
            )}
                <View style={{marginTop:30}}>
                <Text style={styles.title}>Upgrade click</Text>
                <View style={{flexDirection:'row', margin:20,display:'flex',alignItems:'center'}}>
                    <Image style={{width: 50, height: 50,backgroundColor: 'white'}} source={click}/>
                    <Text style={styles.itemTitle}>Увеличить силу</Text>
                    <Text style={styles.itemTitle}>+10$</Text>
                    <TouchableOpacity onPress={() => updateAutoEarn(10,1000)}>
                    <Text style={{
                        color: 'white',
                        fontSize: 15,
                        padding:10,
                        marginLeft: 20,
                        backgroundColor: price >= 1000?'green':'grey',
                        alignItems:'center',
                        justifyContent:'center',
                        alignContent:'center',
                        textAlign:'center'
                    }}>- 1000$</Text>
                    </TouchableOpacity>
                </View>
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
    },
    title:{
        margin: 20,
        fontSize: 30,
        textTransform: 'uppercase',
        fontWeight: 'bold',
        color: 'white'
    },
    itemTitle:{
        color:'white',
        fontSize:20,
        marginLeft:10
    },
    btn:{
        color: 'white',
        fontSize: 15,
        padding:10,
        marginLeft: 20,
        backgroundColor: 'green',
        alignItems:'center',
        justifyContent:'center',
        alignContent:'center',
        textAlign:'center'
    }
  });


export default Shop 