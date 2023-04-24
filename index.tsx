import { registerRootComponent } from 'expo';
import 'react-native-gesture-handler';

import App from './App';
import { ActivityIndicator } from 'react-native';
import { useLocationsStore } from '@app/store/GlobalState';

const WrappedApp = () => {
  const hasHydrated = useLocationsStore((state) => state._hasHydrated);

  if (!hasHydrated) {
    return <ActivityIndicator animating={true} color='blue' size={'large'} />;
  }

  return <App />;
};

registerRootComponent(WrappedApp);
