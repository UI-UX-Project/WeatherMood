import { registerRootComponent } from 'expo';
import 'react-native-gesture-handler';

import App from './App';

const WrappedApp = () => {
  return <App />;
};

registerRootComponent(WrappedApp);