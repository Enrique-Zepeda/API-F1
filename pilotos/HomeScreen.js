import { createDrawerNavigator, DrawerContentScrollView, DrawerItemList, DrawerItem} from '@react-navigation/drawer';
import { Text, View } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

import Noticias from "./Noticias";
import Circuitos from "./Circuitos";
import Pilotos from "./Pilotos";
import Teams from "./Teams";
import Competiciones from "./Competiciones";
import RanKingsTeam from "./RankingsTeams";

const Drawer = createDrawerNavigator();

function CustomDrawerContent(props) {
   const { navigation } = props;
  return (
    <View style={{ flex: 1 }}>
      <DrawerContentScrollView {...props}>
        <DrawerItemList {...props} />
      </DrawerContentScrollView>
      <View style={{ backgroundColor: "#c6cbef", padding: 16 }}>
        <DrawerItem
          label="Usuario"
          onPress={() => {
            console.log("Navegando...");
            navigation.navigate('Usuario');
          }}
          icon={() => <Icon name="user" size={24} />}
        />
      </View>
    </View>
  );
}

function MyDrawer() {
  return (
    <Drawer.Navigator
      useLegacyImplementation
      drawerContent={props => <CustomDrawerContent {...props} />}
      screenOptions={{
        drawerStyle: {
          backgroundColor: '#c6cbef',
          width: 240,
          
        },
        
      }}
    >
      <Drawer.Screen name="Noticias" component={Noticias} />
      <Drawer.Screen name="Circuitos" component={Circuitos} />
      <Drawer.Screen name="Pilotos" component={Pilotos} />
      <Drawer.Screen name="Equipos" component={Teams} />
      <Drawer.Screen name="Mejores Equipos" component={RanKingsTeam} />
    </Drawer.Navigator>
  );
}

export default function HomeScreen() {
  return (
      <MyDrawer />
  );
}