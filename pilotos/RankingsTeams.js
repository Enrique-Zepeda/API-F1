import React, { Component } from 'react';
import { View, Text, TouchableOpacity, Modal, StyleSheet, ScrollView, Image } from 'react-native';

export default class RanKingsTeam extends Component {
  constructor(props) {
    super(props);
    this.state = {
      datos: [],
      modalVisible: false,
      isLoading: true,
      season: "",
      scale: 1,
    };
  }


handleYearSelection = (year) => {
    this.setState({ season: year, modalVisible: false }, () => {
      console.log(this.state.season); // Verifica que la temporada se haya actualizado
      const xhttp = new XMLHttpRequest();
      xhttp.onreadystatechange = () => {
        if (xhttp.readyState === 4 && xhttp.status === 200) {
          const temp = xhttp.responseText;
          const data = JSON.parse(temp);
          this.setState({ datos: data.response, isLoading: false }); // actualizar el estado con los datos y detener la carga
          console.log(data);
        }
      };
      xhttp.open('GET', 'https://unmusical-superviso.000webhostapp.com/F1/RankingsTeams.php?season='+this.state.season, true);
      xhttp.send();
    });
  }

render() {
  return (
    <View style={styles.container}>
      <ScrollView
        contentContainerStyle={[
          styles.scrollViewContent,
          { transform: [{ scale: this.state.scale }] },
        ]}
        scrollEnabled={this.state.scale === 1}
      >
        <Text style={styles.title}>MEJORES EQUIPOS</Text>
        <TouchableOpacity
          style={styles.button}
          onPress={() => this.setState({ modalVisible: true })}
        >
          <Text style={styles.buttonText}>TEMPORADAS</Text>
        </TouchableOpacity>
        <Modal
          visible={this.state.modalVisible}
          onRequestClose={() => this.setState({ modalVisible: false })}
        >
          <View style={styles.modal}>
            {[...Array(12)].map((_, index) => (
              <TouchableOpacity
                key={index}
                onPress={() => this.handleYearSelection(2012 + index)}
              >
                <Text style={styles.year}>{2012 + index}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </Modal>
        {this.state.datos.map((season) => (
          <View key={season.position} style={[styles.pilotoContainer, {flexDirection: "column", alignItems: "center"}]}>

            <View style={styles.posicionContainer}>
              <Text style={styles.posicion}>{season.position}</Text>
            </View>
            <View style={styles.infoContainer}>
              <Image style={styles.logo} source={{ uri: season.team.logo }} />
              <Text style={styles.nombrePiloto}>{season.team.name}</Text>
              <Text style={styles.puntos}>{season.points} PUNTOS</Text>
            </View>

          </View>
        ))}
      </ScrollView>
    </View>
  );
}
}

const styles = StyleSheet.create({
container: {
flex: 1,
backgroundColor: "#1b1b1b",
paddingHorizontal: 20,
paddingTop: 40,
},
title: {
fontSize: 24,
fontWeight: "bold",
color: "#fff",
textAlign: "center",
marginBottom: 20,
},
button: {
backgroundColor: "#ff4655",
borderRadius: 50,
paddingVertical: 10,
paddingHorizontal: 20,
marginTop: 20,
marginBottom: 30,
},
buttonText: {
color: "#fff",
fontSize: 16,
fontWeight: "bold",
textAlign: "center",
textTransform: "uppercase",
},
modal: {
backgroundColor: "#1b1b1b",
padding: 20,
borderRadius: 10,
alignItems: "center",
justifyContent: "center",
},
year: {
fontSize: 16,
paddingVertical: 10,
color: "#fff",
textAlign: "center",
textTransform: "uppercase",
},
pilotoContainer: {
flexDirection: "row",
alignItems: "center",
justifyContent: "space-between",
backgroundColor: "#383838",
borderRadius: 10,
marginBottom: 10,
padding: 10,
shadowColor: "#ff4655",
shadowOffset: {
width: 0,
height: 2,
},
shadowOpacity: 0.4,
shadowRadius: 4,
elevation: 5,
},
posicionContainer: {
flexDirection: "row",
alignItems: "center",
justifyContent: "space-between",
backgroundColor: "#383838",
borderRadius: 10,
marginBottom: 10,
padding: 10,
shadowColor: "#ff4655",
shadowOffset: {
width: 0,
height: 2,
},
shadowOpacity: 0.4,
shadowRadius: 4,
elevation: 5,
},
nombrePiloto: {
fontSize: 18,
fontWeight: "bold",
color: "#fff",
textAlign: "left",
  },
  posicion: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'right'
  },
  puntos: {
    fontSize: 14,
    color: '#666',
    textAlign: 'right'
  },
  logo: {
    width: 120,
    height: 120,
    resizeMode: 'contain',
    marginRight: 10
  },
  infoContainer: {
flexDirection: "column",
alignItems: "center",
justifyContent: "space-between",
backgroundColor: "#383838",
borderRadius: 10,
marginBottom: 10,
padding: 10,
shadowColor: "#ff4655",
shadowOffset: {
width: 0,
height: 2,
},
shadowOpacity: 0.4,
shadowRadius: 4,
elevation: 5,
},
});