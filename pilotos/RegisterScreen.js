import React, { Component } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert,Image} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default class RegisterScreen extends Component {
  constructor(props) {
  super(props);
  this.state = {
    nombre: "",
    correo: "",
    password: "",
    respuesta: "",
    errorCorreo: "",
    errorPassword: "",
    showPassword: false,
  };
}

  validarCorreo = (correo) => {
    // Expresión regular para validar el correo electrónico
    const expresionRegular = /^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i;
    return expresionRegular.test(correo);
  }

  validarPassword = (password) => {
    // Expresión regular para validar la contraseña
    const expresionRegular = /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return expresionRegular.test(password);
  }

  toggleShowPassword = () => {
    this.setState({ showPassword: !this.state.showPassword });
  };

  registro = () => {
    const correoValido = this.validarCorreo(this.state.correo);
    const passwordValido = this.validarPassword(this.state.password);
    
   if (!correoValido) {
  this.setState({ errorCorreo: "Correo no válido" });
  Alert.alert('¡Datos incompletos o Correo No valido!', this.state.errorCorreo);
  return;
}

if (!passwordValido) {
  this.setState({ errorPassword: "La contraseña debe tener al menos 8 caracteres, una letra mayúscula, un número y un carácter especial (@$!%*?&)" });
  Alert.alert('¡La contraseña no cumple con los requisitos!', this.state.errorPassword);
  return;
}

    let _this=this;
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
      if (this.readyState == 4 && this.status == 200) {
        _this.setState({resultado:xhttp.responseText});
        console.log(_this.state.resultado);

        // Si la respuesta indica que el registro fue exitoso, redirigir al usuario a la pantalla de inicio de sesión
        if (xhttp.responseText == "Registration successful") {
          console.log("Registrado con exito");
          Alert.alert('¡Registro exitoso!');
          
          _this.props.navigation.navigate('Login');
        }
        
      }
    };
    xhttp.open("POST", "https://unmusical-superviso.000webhostapp.com/registro.php?name="+this.state.nombre+"&email="+this.state.correo+"&password="+this.state.password, true);
    xhttp.send();
  }

render() {
  const correoValido = this.validarCorreo(this.state.correo);
  const passwordValido = this.validarPassword(this.state.password);
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
      <Text style={styles.title}>Registro</Text>
      <Text style={[styles.error, correoValido ? {color: 'blue'} : null]}>{correoValido ? "Correo válido" : this.state.errorCorreo}</Text>
      <View style={styles.inputContainer}>
        <View style={styles.iconContainer}>
          <Ionicons name="person-outline" size={24} color="#6C63FF" />
        </View>
        <TextInput style={styles.input} placeholder="Nombre" onChangeText={nombre=>this.setState({nombre})} />
      </View>
      <View style={styles.inputContainer}>
        <View style={styles.iconContainer}>
          <Ionicons name="mail-outline" size={24} color="#6C63FF" />
        </View>
        <TextInput style={styles.input} placeholder="Correo Electrónico" onChangeText={correo=>this.setState({correo})} />
      </View>
      <View style={styles.inputContainer}>
        <View style={styles.iconContainer}>
          <Ionicons name="lock-closed-outline" size={24} color="#6C63FF" />
        </View>
        <TextInput style={[styles.input, { paddingRight: 40 }]} placeholder="Contraseña" secureTextEntry={!this.state.showPassword} onChangeText={password => this.setState({ password })} />
        <TouchableOpacity style={[styles.iconContainer, { position: 'absolute', left: 250, top: 12 }]} onPress={this.toggleShowPassword}>
          <Ionicons name={this.state.showPassword ? "eye-off-outline" : "eye-outline"} size={26} color="#6C63FF" />
        </TouchableOpacity>
      </View>
      <Text style={[styles.error, passwordValido ? {color: 'blue'} : null]}>{passwordValido ? "Contraseña válida" : this.state.errorPassword}</Text>
      <TouchableOpacity style={styles.button} onPress={this.registro}>
        <Text style={styles.buttonText}>Registrarse</Text>
      </TouchableOpacity>
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
  inputContainer: {
    width: '80%',
    flexDirection: 'row',
    alignItems: 'center',
    
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
  iconContainer: {
    paddingRight: 10
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
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  error: {
    color: '#FF4136', // Color rojo brillante
    textAlign: 'center',
    marginBottom: 10,
    fontWeight: 'bold',
  },
  logo: {
    width: 200,
    height: 100,
    resizeMode: 'contain',
    marginTop: 50,
  },
});