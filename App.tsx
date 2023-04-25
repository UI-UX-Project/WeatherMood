import AppLoading from '@app/components/general/AppLoading';
import { useLoadFonts } from '@app/hooks/useLoadFonts';
import { useStoreCurrentCity } from '@app/hooks/useStoreCurrentCity';
import HomeScreen, { HomeScreenProps } from '@app/screens/HomeScreen';
import LocationsScreen, { LocationsScreenProps } from '@app/screens/LocationsScreen';
import { HOME_SCREEN, LOCATIONS_SCREEN } from '@app/screens/ScreenNames';
import { navigationRef, setScreenRef } from '@app/services/Navigation';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StatusBar } from 'expo-status-bar';
import { useRef } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';

export type RootStackProps = {
  HOME_SCREEN: HomeScreenProps;
  LOCATIONS_SCREEN: LocationsScreenProps;
};

const Stack = createNativeStackNavigator<RootStackProps>();

export default function App() {
  const routeNameRef = useRef('');
  const fontsLoaded = useLoadFonts();
  const ready = useStoreCurrentCity();

  if (!fontsLoaded || ready === null) return <AppLoading />;

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <NavigationContainer ref={navigationRef} onReady={() => setScreenRef(routeNameRef)}>
        <StatusBar style='light' />
        <Stack.Navigator>
          <Stack.Screen
            name={HOME_SCREEN}
            component={HomeScreen}
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name={LOCATIONS_SCREEN}
            component={LocationsScreen}
            options={{
              headerShown: false,
            }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaView>
  );
}
