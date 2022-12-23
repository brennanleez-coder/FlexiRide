import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View , Platform, KeyboardAvoidingView} from 'react-native';
import { Provider } from 'react-redux';
import HomeScreen from './screens/HomeScreen';
import { store } from './store';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import 'react-native-gesture-handler';
import { NavigationContainer, StackActions } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import MapScreen from './screens/MapScreen';
import EatsScreen from './screens/EatsScreen';
import { TailwindProvider } from 'tailwindcss-react-native';

export default function App() {
  const Stack = createStackNavigator();
  return (
    <Provider store={store}>
      <NavigationContainer>
          <TailwindProvider>
          <SafeAreaProvider>
            <KeyboardAvoidingView
            style={{flex:1}}
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            keyboardVerticalOffset={Platform.OS === "ios" ? -64 : 0}
            >
              <Stack.Navigator>
                <Stack.Screen name="HomeScreen" component={HomeScreen}
                options={{
                  headerShown: false,
                }}
                />

                <Stack.Screen name="MapScreen" component={MapScreen}
                options={{
                  headerShown: false,
                }}/>
                <Stack.Screen name="EatsScreen" component={EatsScreen}
                options={{
                  headerShown: false,
                }}/>
              </Stack.Navigator>
            </KeyboardAvoidingView>
          </SafeAreaProvider>
        </TailwindProvider>
      </NavigationContainer>
    </Provider>
  );
}
