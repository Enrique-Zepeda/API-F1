import React, { Component } from 'react';
import { View, Text, StyleSheet, Image, ScrollView } from 'react-native';

export default class Ventana2 extends Component{
  constructor(props){
    super(props);
    this.state = {
      scale: 1,
  };
}

render(){
  return(
    <View style={{ flex: 1 }}>
          <ScrollView contentContainerStyle={[styles.scrollViewContent,
            { transform: [{ scale: this.state.scale }] }]}
            scrollEnabled={this.state.scale === 1} >

    <View style={styles.contenedorNoticia}>
    <Text style={styles.tituloNoticia}>Pérez se niega a revelar el cambio que lo llevó a la pole en Miami</Text>
     <Image
        style={styles.imagenNoticia}
        source={{
          uri: 'https://cdn-4.motorsport.com/images/amp/63vGKrqY/s1000/sergio-perez-red-bull-racing-r.webp',
        }}
      />
      <Text style={styles.textoNoticia}>Sergio Pérez no quiso "entrar en demasiado detalle" sobre los cambios realizados a su Red Bull RB19 le permitieron dar vuelta su fin de semana en el Gran Premio de Miami de Fórmula 1.</Text>
      </View>
<View style={styles.contenedorNoticia}>
      <Text style={styles.tituloNoticia}>Red Bull desmiente "intercambio de rehenes" con Ferrari por Mekies</Text>
     <Image
        style={styles.imagenNoticia}
        source={{
          uri: 'https://cdn-7.motorsport.com/images/amp/2wBVWR30/s1000/christian-horner-team-principa.webp',
        }}
      />
      <Text style={styles.textoNoticia}>Red Bull ha dejado claro que cualquier "intercambio de rehenes" entre ellos y Ferrari sobre el futuro de Laurent Mekies en la Fórmula 1 no implicará a ninguno de sus altos cargos.</Text>
      </View>
      <View style={styles.contenedorNoticia}>
      <Text style={styles.tituloNoticia}>Checo Pérez: he trabajado para esto toda mi vida y no tengo presión</Text>
     <Image
        style={styles.imagenNoticia}
        source={{
          uri: 'https://cdn-4.motorsport.com/images/amp/0RrmxGv0/s1000/sergio-perez-red-bull-racing-1.webp',
        }}
      />
      <Text style={styles.textoNoticia}>Checo Pérez indicó que, por ahora, prefiere pensar carrera a carrera y disfrutar el momento que está viviendo en la pelea por el campeonato de la F1 2023.</Text>
      </View>

   <View style={styles.contenedorNoticia}>
      <Text style={styles.tituloNoticia}>GALERÍA TÉCNICA: Detalles de los F1 en el pitlane en Miami</Text>
     <Image
        style={styles.imagenNoticia}
        source={{
          uri: 'https://cdn-6.motorsport.com/images/amp/0rGb1g52/s1000/red-bull-racing-rb19-side-deta.webp',
        }}
      />
      <Text style={styles.textoNoticia}>Acompáñenos en el análisis de las características técnicas de la Fórmula 1 que se exhiben en el pitlane mientras los equipos se preparan para el Gran Premio de Miami, por cortesía de Giorgio Piola y Sutton Images.</Text>
      </View>


      <View style={styles.contenedorNoticia}>
      <Text style={styles.tituloNoticia}>Mercedes sufre para hacer cambios en su coche por el tope de gastos</Text>
     <Image
        style={styles.imagenNoticia}
        source={{
          uri: 'https://cdn-6.motorsport.com/images/amp/2jX9Ejg6/s1000/formula-1-azerbaijan-gp-2023-g-2.webp',
        }}
      />
      <Text style={styles.textoNoticia}>Toto Wolff, jefe de Mercedes, ha detallado por qué es un "proceso tan doloroso" para su equipo Mercedes volver al frente bajo las restricciones del límite de gastos de la Fórmula 1.</Text>
      </View>

      </ScrollView>
    </View>

  );
}
}


const styles = StyleSheet.create({
  contenedorNoticia: {
       backgroundColor: '#fff',
    borderRadius: 10,
    marginHorizontal: 20,
    marginVertical: 10,
    paddingHorizontal: 15,
    paddingVertical: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 2,
  },
  imagenNoticia: {
    height: 250,
    width: '100%',
    borderRadius: 10,
    marginBottom: 10,
  },
  tituloNoticia: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 5,
    textAlign: 'center',
    color: '#222',
  },
  textoNoticia: {
    fontSize: 16,
    color: '#444',
    lineHeight: 24,
    textAlign: 'justify',
  },
});