import React, { Component } from 'react';
import { View, Text, StyleSheet, Image, ScrollView } from 'react-native';

export default class Pilotos extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: "",
      datos: [],
      scale: 1,
      isLoading: true,
    };
  }

  componentDidMount() {
    const xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = () => {
      if (xhttp.readyState === 4 && xhttp.status === 200) {
        const temp = xhttp.responseText;
        const data = JSON.parse(temp);
        this.setState({ datos: data.response, isLoading: false });
        console.log(data);
      }
    };
    xhttp.open('GET', 'https://unmusical-superviso.000webhostapp.com/F1/Piloto.php', true);
    xhttp.send();
  }

  render() {
    const { isLoading } = this.state;

    if (isLoading) {
      return (
        <View style={styles.loadingContainer}>
          <Text style={styles.loadingText}>Cargando Pilotos...</Text>
        </View>
      );
    } else {
      return (
        <View style={{ flex: 1 }}>
          <ScrollView
            contentContainerStyle={[
              styles.scrollViewContent,
              { transform: [{ scale: this.state.scale }] },
            ]}
            scrollEnabled={this.state.scale === 1}
          >
            <View style={styles.titleContainer}>
              <Text style={styles.title}>Top Pilotos</Text>
              <Text style={styles.title}>de la</Text>
              <Text style={styles.title}>Fórmula 1</Text>
            </View>
            <View style={styles.container}>
              {this.state.datos
                .sort((a, b) => b.points - a.points)
                .map((piloto, index) => (
                  <View key={piloto.driver.id} style={styles.pilotoContainer}>
                    <View style={styles.posicionContainer}>
                      <Text style={styles.posicion}>{index + 1}</Text>
                    </View>
                    <Image style={styles.logo} source={{ uri: piloto.driver.image }} />
                    <View style={styles.infoContainer}>
                      <Text style={styles.nombrePiloto}>{piloto.driver.name}</Text>
                      <Text style={styles.nombreEquipo}>{piloto.team.name}</Text>
                      <Text style={styles.puntos}>{piloto.points} puntos</Text>
                    </View>
                  </View>
                ))}
            </View>
          </ScrollView>
        </View>
      );
    }
  }
}

const styles = StyleSheet.create({
  scrollViewContent: {
    flexGrow: 1,
    alignItems: 'center',
  },
  titleContainer: {
    backgroundColor: '#F7AF1D',
    height: 110,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#fff'
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#fff',
    letterSpacing: 1,
    textTransform: 'uppercase'
  },
  container: {
    flexDirection: 'column',
    paddingHorizontal: 20,
    paddingTop: 50,
    backgroundColor: '#F7AF1D',
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    marginTop: 20
  },
  pilotoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#fff',
    borderRadius: 10,
    marginBottom: 10,
    padding: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    elevation: 4,
  },
  nombrePiloto: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'left'
  },
  posicion: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'right'
  },
  nombreEquipo: {
    fontSize: 14,
    color: '#666',
    textAlign: 'left'
  },
  puntos: {
    fontSize: 14,
    color: '#666',
    textAlign: 'right'
  },
  logo: {
    width: 60,
    height: 60,
    resizeMode: 'contain',
    marginRight: 10
  },
  loadingContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F7AF1D',
  },
  loadingText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
    marginTop: 20
  },
});