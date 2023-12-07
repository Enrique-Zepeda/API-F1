import React, { Component } from 'react';
import { View, Text, StyleSheet, Image, ScrollView, Dimensions } from 'react-native';

const { width } = Dimensions.get('window');

export default class Teams extends Component {
  constructor(props) {
    super(props);
    this.state = {
      teams: [],
      isLoading: true,
    };
  }

  componentDidMount() {
    this.fetchTeams();
  }

  fetchTeams = async () => {
    try {
      const response = await fetch('https://unmusical-superviso.000webhostapp.com/F1/Teams.php');
      const json = await response.json();
      this.setState({ teams: json.response, isLoading: false });
    } catch (error) {
      console.error(error);
    }
  }

  renderTeam = (team) => {
    return (
      <View key={team.id} style={styles.teamContainer}>
        <View style={styles.logoContainer}>
          <Image style={styles.logo} source={{ uri: team.logo }} />
        <Text style={[styles.name, { fontSize: 20, fontWeight: 'bold' }]}>{team.name}</Text>
        <Text style={[styles.name, { fontSize: 20, fontWeight: 'bold' }]}>Campeonatos Mundiales {team.world_championships}</Text>
      </View>
       </View>
    );
  }

  render() {
    const { isLoading, teams } = this.state;
    if (isLoading) {
      return (
        <View style={styles.loadingContainer}>
          <Text style={styles.loadingText}>Cargando equipos...</Text>
        </View>
      );
    } else {
      return (
        <View style={styles.container}>
          <View style={styles.titleContainer}>
            <Text style={styles.title}>Equipos</Text>
          </View>
          <ScrollView contentContainerStyle={styles.scrollView} horizontal={true}>
            {teams.map((team) => this.renderTeam(team))}
          </ScrollView>
        </View>
      );
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5fcff',
  },
  scrollView: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 10,
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
  teamContainer: {
    alignItems: 'center',
    marginVertical: 10,
    marginRight: 10,
  },
  logo: {
    width: width * 0.89,
    height: width * 0.5,
    resizeMode: 'contain',
  },
  name: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 10,
    textAlign: 'center',
    width: width * 0.8,
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
  logoContainer: {
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