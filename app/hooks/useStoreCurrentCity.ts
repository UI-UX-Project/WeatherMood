import { ReverseGeocodingService } from '@app/api/ReverseGeocodingService';
import { useGlobalStore } from '@app/store/GlobalState';
import * as Location from 'expo-location';
import { useEffect, useState } from 'react';

export const useStoreCurrentCity = () => {
  const [ready, setReady] = useState<null | 'ready' | 'error'>(null);
  const setCurrentCity = useGlobalStore((state) => state.setCurrentCity);

  useEffect(() => {
    (async function () {
      try {
        const { status } = await Location.requestForegroundPermissionsAsync();

        if (status !== 'granted') return setReady('error');

        const currentLocation = await Location.getCurrentPositionAsync({ accuracy: Location.Accuracy.Low });

        const { latitude, longitude } = currentLocation.coords;
        console.log(latitude, longitude);
        const res = await ReverseGeocodingService.getCityName({ latitude, longitude });

        if (!res.ok) return setReady('error');

        setCurrentCity(res.data![0].name);
        setReady('ready');
      } catch (error: any) {
        setReady('error');
        console.log(error);
      }
    })();
  }, []);

  return ready;
};
