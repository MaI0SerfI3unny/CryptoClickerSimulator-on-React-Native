import React from 'react'
import home from '../../assets/home.png'
import shop from '../../assets/shop.png'
import auction from '../../assets/auction.png'
import exchange from '../../assets/exchange.png'
import { 
    StyleSheet, 
    Text, 
    View,
    Image,
    TouchableOpacity} from 'react-native';

const Footer = (props) => {
    const {navigation} = props
    return(
        <View style={styles.footer}>
        <TouchableOpacity onPress={() => navigation.navigate('Home')}>
        <View style={{display:'flex',alignItems:'center',marginRight: 30}}>
          <Image style={{width: 30,height: 30}} source={home}/>
          <Text>Главная</Text>
        </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('Exchange')}>
        <View style={{display:'flex',alignItems:'center',marginRight: 30}}>
          <Image style={{width: 30,height: 30}} source={exchange}/>
          <Text>Обменник</Text>
        </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('Auction')}>
        <View style={{display:'flex',alignItems:'center',marginRight: 30}}>
          <Image style={{width: 30,height: 30}} source={auction}/>
          <Text>Аукцион</Text>
        </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('Shop')}>
        <View style={{display:'flex',alignItems:'center',marginRight: 0}}>
          <Image style={{width: 30,height: 30}} source={shop}/>
          <Text>Магазин</Text>
        </View>
        </TouchableOpacity>
      </View>
    )
}

const styles = StyleSheet.create({
    footer:{
      flexDirection:'row',
      justifyContent:'center',
      display:'flex',
      padding: 20,
      
    }
  });

export default Footer