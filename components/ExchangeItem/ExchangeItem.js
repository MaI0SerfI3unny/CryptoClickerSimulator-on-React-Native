import React,{useState} from 'react'
import { 
    Text, 
    View,
    Image,
    TextInput,
    TouchableOpacity} from 'react-native';
import exchanger from '../../assets/exchanger.png'
import usdt from '../../assets/currency/USDT.png'

const ExchangeItem = (props) => {
    const {item,price,buyCurrency} = props
    const [availableItem, setAvailablePrice] = useState(parseInt(price/item.price));
    return(
        <View style={{marginBottom: 30,textAlign:'center',justifyContent:'center',display:'flex',alignItems: 'center'}}>
        <Text 
        style={{color:'white',textAlign:"center",marginBottom: 20}}> 
           1 {item.name} = {item.price}$
        </Text>
       <View style={{flexDirection: 'row',display:'flex',justifyContent:'center',alignItems:'center',textAlign:'center'}}>
           <View>
            <View style={{flexDirection:'row'}}>
                <Text style={{color: 'white',fontSize: 20,fontWeight: 'bold'}}>{item.name}</Text>
                <Image
                style={{marginRight: 20,marginLeft: 10}}
                source={item.imag}/>
            </View>
            <Text style={{
                borderWidth: 1,
                color:'white',
                borderColor:'white',
                marginTop:20,
                width: 80,
                height:30,
                padding:5
                }}>{parseInt(price / item.price)}</Text>
           </View>
           <Image
            style={{
                backgroundColor:'white',
                borderRadius: 30}}
            source={exchanger}/>
          <View>
            <View style={{flexDirection: 'row',display:'flex',justifyContent:'center',alignItems:'center',textAlign:'center'}}>
                <Image
                style={{marginRight: 10,marginLeft: 20}}
                source={usdt}/>
                <Text style={{color: 'white',fontSize: 20,fontWeight: 'bold'}}>USDT</Text>
            </View>
            <Text style={{
                borderWidth: 1,
                color:'white',
                borderColor:'white',
                marginTop:20,
                width: 100,
                height:30,
                marginLeft:20,
                padding:5
                }}>{(parseInt(price/item.price))*item.price}</Text>
          </View>
    
           <TouchableOpacity onPress={() => buyCurrency(item.name, (parseInt(price/item.price))*item.price,parseInt(price / item.price))}>
               <Text style={{
                   color:'white',
                   marginLeft: 10,
                   padding: 10,
                   backgroundColor: price >= item.price? 'green': 'grey', 
                   }}>Exchange</Text>
                   
           </TouchableOpacity>
       </View>
   </View>
    )
}

export default ExchangeItem