import React, { Component } from 'react';
import { View, Text, Image, StyleSheet, AsyncStorage } from 'react-native';

export default class Perfil extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userData: [],
      idUsuario: "",
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

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <View style={styles.imageContainer}>
            <Image
              style={styles.fotoPerfil}
              source={{
                uri:
                  "https://cdn-icons-png.flaticon.com/512/3106/3106807.png",
              }}
            />
          </View>
          <View style={styles.textContainer}>
            <Text style={styles.nombre}> {this.state.userData.name} </Text>
            <Text style={styles.email}> {this.state.userData.email} </Text>
          </View>
        </View>
        <View style={styles.content}>
          <Text style={styles.title}>Actividad reciente</Text>
          <View style={styles.activityContainer}>
            <View style={styles.activity}>
              <Text style={styles.activityText}>Carreras vistas</Text>
              <Text style={styles.activityNumber}>12</Text>
            </View>
            <View style={styles.activity}>
              <Text style={styles.activityText}>Equipos Favoritos</Text>
              <Text style={styles.activityNumber}>4</Text>
            </View>
          </View>
          <Text style={styles.title}>Equipos Seguidos</Text>
          <View style={styles.trophiesContainer}>
            <Image
              style={styles.trophy}
              source={{
                uri:
                  "https://cdn-4.motorsport.com/images/mgl/Y99JQRbY/s8/red-bull-racing-logo-1.jpg",
              }}
            />
            <Image
              style={styles.trophy}
              source={{
                uri:
                  "https://lezebre.lu/images/detailed/17/30580-Force-India-F1.png",
              }}
            />
             <Image
              style={styles.trophy}
              source={{
                uri:
                  "https://logos-world.net/wp-content/uploads/2020/07/Ferrari-Scuderia-Logo.png",
              }}
            />
             <Image
              style={styles.trophy}
              source={{
                uri:
                  "https://cdn-7.motorsport.com/images/mgl/Y99JQR8Y/s8/scuderia-alphatauri-f1-logo-1.jpg",
              }}
            />
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#F5F5F5',
    borderRadius: 10,
    width: '90%',
    height: 250,
    alignSelf: 'center',
    marginTop: 30,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  imageContainer: {
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
  textContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  nombre: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 5,
  },
  email: {
    fontSize: 16,
    color: '#777',
  },
  content: {
    padding: 10,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  activityContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  activity: {
    alignItems: 'center',
  },
  activityText: {
    fontSize: 16,
    color: '#666',
  },
  activityNumber: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
  trophiesContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  trophy: {
    width: 90,
    height: 90,
    resizeMode: 'contain',
  },
});