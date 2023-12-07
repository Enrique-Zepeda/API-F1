import React, { Component } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, Alert, AsyncStorage, TextInput } from 'react-native';


export default class Ajustes extends Component {
  constructor(props) {
    super(props);
    this.state = {
     userData: [],
     idUsuario: "",
     nombreInput: "",
     correoInput: "",
     contraseñaInput: "",
    };
  }

    componentDidMount() {
    this.getUser().then((userId) => {
      console.log(userId);
      const xhttp = new XMLHttpRequest();
      xhttp.onreadystatechange = () => {
        if (xhttp.readyState === 4 && xhttp.status === 200) {
          const temp = xhttp.responseText;
          const data = JSON.parse(temp);
          this.setState({ userData: data }); // actualizar el estado con los datos y detener la carga
          console.log(data);
        }
      };

      console.log(this.state.idUsuario);
      xhttp.open(
        "GET",
        "https://unmusical-superviso.000webhostapp.com/Usuario.php?ID=" +
          userId,
        true
      );
      xhttp.send();
    });
  }

  async getUser() {
    try {
      const userId = await AsyncStorage.getItem("userId");
      if (userId !== null) {
        console.log("User ID retrieved successfully: ", userId);
        this.setState({ idUsuario: userId });
        return userId;
      } else {
        console.log("User ID not found!");
      }
    } catch (error) {
      console.log("Error retrieving user ID: ", error);
    }
  }

  handleCerrarSesion = () => {
    Alert.alert(
      "Cerrar sesión",
      "¿Estás seguro de que deseas cerrar sesión?",
      [
        {
          text: "Cancelar",
          style: "cancel"
        },
        { text: "Sí", onPress: () => this.cerrarSesion() }
      ]
    );
  }

  cerrarSesion = async () => {
    try {
      await AsyncStorage.removeItem("userId");
      console.log("User ID removed from storage.");
      this.props.navigation.reset({
        index: 0,
        routes: [{ name: 'Login' }],
      });
    } catch (error) {
      console.log("Error removing user ID from storage: ", error);
    }
  }

  handleOpcionPress = (opcion) => {
    switch (opcion) {
      case "nombre":
        this.setState({ nombreInput: this.state.userData.name });
        
        break;
      case "correo":
        this.setState({ correoInput: this.state.userData.email });
        break;
      case "contraseña":
        this.setState({ contraseñaInput: "" });
        break;
    }
  };

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.perfilContainer}>
          <TouchableOpacity style={styles.fotoPerfilContainer}>
            <Image
              style={styles.fotoPerfil}
              source={{
                uri:
                  'https://cdn-icons-png.flaticon.com/512/3106/3106807.png',
              }}
            />
          </TouchableOpacity>
          <View style={styles.infoContainer}>
            <Text style={styles.nombre}>{this.state.userData.name}</Text>
            <Text style={styles.correo}>{this.state.userData.email}</Text>
          </View>
        </View>
        <View style={styles.seccionContainer}>
          <TouchableOpacity style={styles.opcionContainer} onPress={() => this.handleOpcionPress("nombre")}>
            <Text style={styles.opcionTexto}>Cambiar Nombre</Text>
            <TextInput
              style={styles.textInput}
              value={this.state.nombreInput}
              onChangeText={(text) => this.setState({ nombreInput: text })}
            />
          </TouchableOpacity>
          <TouchableOpacity style={styles.opcionContainer} onPress={() => this.handleOpcionPress("correo")}>
            <Text style={styles.opcionTexto}>Cambiar Correo</Text>
            <TextInput
              style={styles.textInput}
              value={this.state.correoInput}
              onChangeText={(text) => this.setState({ correoInput: text })}
            />
          </TouchableOpacity>
          <TouchableOpacity style={styles.opcionContainer} onPress={() => this.handleOpcionPress("contraseña")}>
            <Text style={styles.opcionTexto}>Cambiar Contraseña</Text>
            <TextInput
              style={styles.textInput}
              value={this.state.contraseñaInput}
              onChangeText={(text) => this.setState({ contraseñaInput: text })}
            />
          </TouchableOpacity>
          <TouchableOpacity style={styles.cerrarSesionContainer} onPress={this.handleCerrarSesion} >
            <Text style={styles.cerrarSesionTexto}>Cerrar Sesión</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  perfilContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    marginHorizontal: 20,
    marginVertical: 30,
    paddingHorizontal: 20,
    paddingVertical: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  fotoPerfilContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    overflow: 'hidden',
    marginRight: 20,
  },
  fotoPerfil: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  infoContainer: {
    flex: 1,
  },
  nombre: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 5,
  },
  correo: {
    fontSize: 16,
    color: '#777',
  },
  seccionContainer: {
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    marginHorizontal: 20,
    paddingVertical: 10,
    paddingHorizontal: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  opcionContainer: {
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#EFEFEF',
  },
  opcionTexto: {
    fontSize: 16,
    color: '#333',
  },
  cerrarSesionContainer: {
  paddingVertical: 15,
  borderBottomWidth: 1,
  borderBottomColor: '#EFEFEF',
  borderTopWidth: 1,
  borderTopColor: '#EFEFEF',
  marginTop: 20,
},
cerrarSesionTexto: {
  fontSize: 16,
  color: '#FF0000',
  textAlign: 'center',
},
});