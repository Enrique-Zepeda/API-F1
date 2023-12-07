import React, { Component } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert} from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import Perfil from './Perfil';
import Ajustes from './Ajustes';

export default class HomeScreen extends Component{
  constructor(props){
    super(props);
    this.state = {
  };
}

render(){
  const Tab = createBottomTabNavigator();
  return(
    <Tab.Navigator>
        <Tab.Screen name="Perfil" component={Perfil} 
        options={{headerShown:false,
        tabBarIcon:({tinColor}) =>(
          <Ionicons name='person' size={30} color="blue" />
        )
        }}
         />
        <Tab.Screen name="Ajustes" component={Ajustes} 
          options={{headerShown:false,
        tabBarIcon:({tinColor}) =>(
          <Ionicons name='ios-cog' size={30} color="blue" />
        )
          }}
        />
    </Tab.Navigator>

  );
}
}
