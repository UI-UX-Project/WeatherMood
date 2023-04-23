import HomeScreen, { HomeScreenProps } from '@app/screens/HomeScreen';
import { HOME_SCREEN } from '@app/screens/ScreenNames';
import { navigationRef, setScreenRef } from '@app/services/Navigation';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StatusBar } from 'expo-status-bar';
import { useRef } from 'react';

export type RootStackProps = {
  HOME_SCREEN: HomeScreenProps;
};

const Stack = createNativeStackNavigator<RootStackProps>();

export default function App() {
  const routeNameRef = useRef('');

  return (
    <NavigationContainer ref={navigationRef} onReady={() => setScreenRef(routeNameRef)}>
      <StatusBar style='auto' />
      <Stack.Navigator>
        <Stack.Screen name={HOME_SCREEN} component={HomeScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
