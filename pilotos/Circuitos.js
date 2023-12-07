import React, { Component } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import ImageViewer from 'react-native-image-zoom-viewer';

export default class Circuitos extends Component {
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
    xhttp.open('GET', 'https://unmusical-superviso.000webhostapp.com/F1/Circuitos.php', true);
    xhttp.send();
  }

  render() {
    const { isLoading } = this.state; // obtener el estado de isLoading del estado

    if (isLoading) { // verificar si se están cargando los datos
      return (
        <View style={styles.loadingContainer}>
          <Text style={styles.loadingText}>Cargando Circuitos...</Text>
        </View>
      );
    } else {
      return (
        <View style={{ flex: 1 }}>
          <ScrollView contentContainerStyle={[styles.scrollViewContent,
            { transform: [{ scale: this.state.scale }] }]}
            scrollEnabled={this.state.scale === 1} >

            <View style={styles.titleContainer}>
              <Text style={styles.title}>CIRCUITOS</Text>
            </View>
            
            <View style={styles.container}>
              {
                this.state.datos.slice(0, 10).map(circuito => (
                  <View key={circuito.id} style={styles.itemContainer}>
                    <View style={styles.competitionContainer}>
                      <Text style={styles.itemText}>{circuito.competition.name}</Text>
                    </View>
                    <View style={styles.imageContainer}>
                      <ImageViewer
                        style={styles.logo}
                        imageUrls={[{ url: circuito.image }]}
                        renderIndicator={() => null}
                        enableSwipeDown={true}
                      />
                    </View>
                    <View style={styles.textContainer}>
                      <Text style={styles.circuitName}>{circuito.name}</Text>
                    </View>
                  </View>
                ))
              }
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
    justifyContent: 'center',
    alignItems: 'center'
  },
  titleContainer: {
    backgroundColor: '#ff7900',
    height: 120,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center'
  },
  title: {
    fontSize: 48,
    fontWeight: 'bold',
    color: '#ddd',
    letterSpacing: 5,
    textTransform: 'uppercase'
  },
  container: {
    flexWrap: 'wrap',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 30,
    backgroundColor: '#121212',
  },
  itemContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    width: '45%',
    height: 250,
    backgroundColor: '#333',
    borderRadius: 20,
    marginVertical: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.4,
    shadowRadius: 6,
    elevation: 5,
  },
  imageContainer: {
    width: '100%',
    height: '70%',
    overflow: 'hidden',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    backgroundColor: '#555',
    borderBottomWidth: 1,
    borderBottomColor: '#666',
  },
  logo: {
    width: '100%',
    height: '100%'
  },
  textContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    paddingVertical: 10,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#666',
  },
  itemText: {
    fontSize: 24,
    fontWeight: 'bold',
    fontStyle: 'italic',
    color: '#ddd',
    textAlign: 'center',
    marginHorizontal: 10,
    
  },
  circuitName: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#66c',
    padding: 8,
    borderRadius: 4,
    backgroundColor: '#333',
    marginTop: 5,
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
});