import * as Location from 'expo-location';
import { useEffect, useState } from 'react';

export const useCurrentLocation = () => {
  const [location, setLocation] = useState<Location.LocationObject | null | 'error'>(null);

  useEffect(() => {
    (async function () {
      try {
        const { status } = await Location.requestForegroundPermissionsAsync();

        if (status !== 'granted') {
          setLocation('error');
          return;
        }

        const currentLocation = await Location.getCurrentPositionAsync({ accuracy: Location.Accuracy.Low });
        setLocation(currentLocation);
      } catch (error: any) {
        setLocation('error');
        console.log(error);
      }
    })();
  }, []);

  return location;
};
