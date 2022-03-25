import React from 'react'
import { 
    StyleSheet, 
    Text, 
    View,
    Image,} from 'react-native';
import logo from '../../assets/logo.png'

const Header = () => {
    return(
        <View style={styles.header}>
        <Image style={{width: 50,height: 50,marginRight:10}} source={logo}/>
          <Text style={styles.title}>CCSimulator</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    header: {
      backgroundColor: "#131321",
      flexDirection: 'row',
      display: 'flex',
      padding: 15,
      alignItems: 'center'
    },
    title:{
      color: 'white',
      textTransform: 'uppercase',
      fontWeight: 'bold',
      fontSize: 20,
    }
  });

export default Header