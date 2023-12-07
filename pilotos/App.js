import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from './LoginScreen';
import HomeScreen from './HomeScreen';
import RegisterScreen from './RegisterScreen';
import Usuario from './Usuario';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Login"
          component={LoginScreen}
          options={{
            headerShown: false,
            cardStyle: { backgroundColor: '#000' },
            cardStyleInterpolator: ({ current: { progress } }) => ({
              cardStyle: {
                opacity: progress,
              },
            }),
          }}
        />

        <Stack.Screen
          name="Register"
          component={RegisterScreen}
          options={{
            title: 'Regresar',
            headerStyle: {
              backgroundColor: '#252222',
            },
            headerTintColor: 'white',
          }}
        />

        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{
            headerShown: false,
            cardStyle: { backgroundColor: '#000' },
            cardStyleInterpolator: ({ current: { progress } }) => ({
              cardStyle: {
                opacity: progress,
              },
            }),
          }}
        />
        <Stack.Screen name="Usuario" component={Usuario} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
