import React, { Component } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import ImageViewer from 'react-native-image-zoom-viewer';

export default class Competicioness extends Component {
  constructor(props) {
    super(props);
    this.state = {
      datos: [],
      scale: 1,
      isLoading: true // nuevo estado para indicar si se están cargando los datos
    };
  }

  componentDidMount() {
    const xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = () => {
      if (xhttp.readyState === 4 && xhttp.status === 200) {
        const temp = xhttp.responseText;
        const data = JSON.parse(temp);
        this.setState({ datos: data.response, isLoading: false }); // actualizar el estado con los datos y detener la carga
        console.log(data);
      }
    };
    xhttp.open('GET', 'https://unmusical-superviso.000webhostapp.com/F1/Competiciones.php', true);
    xhttp.send();
  }

  render() {
    const { isLoading } = this.state; // obtener el estado de isLoading del estado

    if (isLoading) { // verificar si se están cargando los datos
      return (
        <View style={styles.loadingContainer}>
          <Text style={styles.loadingText}>Cargando Competiciones...</Text>
        </View>
      );
    } else {
      return (
        <View style={{ flex: 1 }}>
          <ScrollView contentContainerStyle={[styles.scrollViewContent,
            { transform: [{ scale: this.state.scale }] }]}
            scrollEnabled={this.state.scale === 1} >

            <View style={styles.titleContainer}>
              <Text style={styles.title}>Competiciones</Text>
            </View>
            
            
              {
                this.state.datos.slice(0, 10).map(compe => (
                  <View key={compe.id} >
                    <View style={styles.container}>
                      <Text style={styles.compe}>Competicione N°{compe.id}</Text>
                      <Text style={styles.nombreCompe}>Nombre {compe.name}</Text>
                      <Text style={styles.nombreCompe}>Pais {compe.location.country}</Text>
                      <Text style={styles.nombreCompe}>Ciudad {compe.location.city}</Text>
                    </View>
                  </View>
                ))
              }
          </ScrollView>
        </View>
      );
    }
  }
}

const styles = StyleSheet.create({
  scrollViewContent: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  titleContainer: {
    backgroundColor: '#ff7900',
    height: 100,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center'
  },
  title: {
    fontSize: 40,
    fontWeight: 'bold',
    color: '#ddd',
    letterSpacing: 5,
    textTransform: 'uppercase'
  },
  container: {
    flexDirection: 'column',
    paddingHorizontal: 20,
    paddingTop: 50,
    backgroundColor: '#4AD2DB',
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    borderBottomLeftRadius: 25,
    borderBottomRightRadius: 25,
    width: '90%',
    height: 200,
    overflow: 'hidden',
    marginTop: 10
  },
  compe: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center'
  },
   loadingContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f5fcff',
  },
  loadingText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'gray',
  },
    nombreCompe: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'left'
  },
 
});