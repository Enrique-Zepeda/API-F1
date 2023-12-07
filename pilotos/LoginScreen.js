import React, { Component } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, Image , AsyncStorage } from 'react-native';

import { Ionicons } from '@expo/vector-icons';
import Perfil from './Perfil';


export default class login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      resultado: "",
      showPassword: false,
      userID: "",
    };
  }

toggleShowPassword = () => {
  this.setState({ showPassword: !this.state.showPassword });
};

render(){
 const handleLoginPress = () =>{
   let _this =this;
      var xhttp = new XMLHttpRequest();
      xhttp.onreadystatechange = function() {
      if (this.readyState == 4 && this.status == 200) {
       // Typical action to be performed when the document is ready:
      if(xhttp.responseText =="Correo o password incorrectos"){
       _this.setState({resultado:xhttp.responseText});
      }
      else{
      _this.setState({resultado:JSON.parse(xhttp.responseText)});
      _this.setState({userID:_this.state.resultado.id});
      }
       console.log(_this.state.resultado);
       console.log(_this.state.resultado.status);
       console.log(_this.state.userID)
            if(_this.state.resultado.status == "0"){
              Alert.alert('¡Correo no verificado!');
              console.log("Correo No verificado");
              
            }else if(_this.state.resultado.status == "1"){
              console.log("Exito");
              _this.props.navigation.navigate('Home');
              login(_this.state.userID)

            }
            else{
             Alert.alert('¡Credenciales no validas!');
              console.log("Credenciales no validas");
              
            }
          
            
    }
    };
    xhttp.open("GET", "https://unmusical-superviso.000webhostapp.com/Email.php?email="+this.state.email+"&password="+this.state.password, true);
    xhttp.send();
    }

  async function login(userID){
  try {
    await AsyncStorage.setItem('userId',userID);
    console.log('User ID saved successfully!');
  } catch (error) {
    console.log('Error saving user ID: ', error);
  }
}

handleRegisterPress = () => {
    this.props.navigation.navigate('Register'); // Redirigir a la pantalla de inicio de sesión
  };

iniciofast = () => {
    this.props.navigation.navigate('Home'); // Redirigir a la pantalla de inicio de sesión
  };

  return (
    <View style={styles.container}>
    <View style={styles.logoContainer}>
            <Image
        style={styles.logo}
        source={{
          uri: 'https://1000marcas.net/wp-content/uploads/2020/01/logo-F1-500x281.png',
        }}
      />
        </View>
      <Text style={styles.title}>Inicio de Sesión</Text>
       <View style={styles.inputContainer}>
        <View style={styles.iconContainer}>
          <Ionicons name="mail-outline" size={24} color="#6C63FF" />
        </View>
        <TextInput style={[styles.input, { marginBottom: -1 }]} placeholder="Correo Electrónico" onChangeText={email=>this.setState({email})} />
      </View>
        <View style={styles.inputContainer}>
  <View style={styles.iconContainer}>
    <Ionicons name="lock-closed-outline" size={24} color="#6C63FF" />
  </View>
  <TextInput style={[styles.input, { marginTop: -1, paddingRight: 40 }]} placeholder="Contraseña" secureTextEntry={!this.state.showPassword} onChangeText={password=>this.setState({password})} />
  <TouchableOpacity style={[styles.iconContainer, { position: 'absolute', left: 250, top: 12 }]} onPress={this.toggleShowPassword}>
    <Ionicons name={this.state.showPassword ? "eye-off-outline" : "eye-outline"} size={26} color="#6C63FF" />
  </TouchableOpacity>
</View>
      <TouchableOpacity style={styles.button} onPress={handleLoginPress}>
        <Text style={styles.buttonText}>Iniciar Sesión</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={handleRegisterPress}>
        <Text style={styles.buttonText}>Registrarse</Text>
      </TouchableOpacity>
   <View style={styles.buttonContainer}>
  <Text style={styles.loginText}>¿Ya tienes una cuenta? Inicia sesión con:</Text>
  <View style={styles.logoContainer}>
    <TouchableOpacity onPress={handleRegisterPress}>
      <Image style={styles.logoApp} source={{ uri: 'https://cdn4.iconfinder.com/data/icons/social-media-2210/24/Google-512.png' }} />
    </TouchableOpacity>
    <TouchableOpacity onPress={handleRegisterPress}> 
      <Image style={styles.logoApp} source={{ uri: 'https://cdn3.iconfinder.com/data/icons/capsocial-round/500/facebook-512.png' }} />
    </TouchableOpacity>
  </View>
</View>
    </View>
  );
}
}



const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#252222', // Fondo gris claro
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#FFFFFF', // Texto oscuro
    textAlign: 'center',
  },
  input: {
    width: '80%',
    height: 50,
    borderWidth: 1,
    borderColor: '#000000',
    borderRadius: 5,
    marginBottom: 20,
    paddingLeft: 10,
    backgroundColor: '#636363', // Fondo blanco
    elevation: 2, // Agrega sombra
  },
  button: {
    width: '80%',
    height: 50,
    backgroundColor: '#6C63FF', // Color vibrante
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 5,
    marginTop: 20,
    elevation: 3, // Agrega sombra
  },
  inputContainer: {
    width: '80%',
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  iconContainer: {
    paddingRight: 10
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  logo: {
    width: 200,
    height: 100,
    resizeMode: 'contain',
    marginTop: 50,
  },
   buttonContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
  },
  loginText: {
    color: '#FFFFFF', // Texto oscuro
    marginBottom: 10,
  },
  logoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  logoApp: {
    width: 40,
    height: 40,
    resizeMode: 'contain',
    marginHorizontal: 10,
  },
});