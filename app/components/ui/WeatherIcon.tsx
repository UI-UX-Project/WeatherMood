import { Image } from 'react-native';

const WeatherIcon = ({
  condition,
  size = 50,
  style = {},
}: {
  condition: string;
  size?: number;
  style?: Record<string, any>;
}) => {
  const images: any = {
    Sunny: require('@app/assets/conditions/sunny.png'),
    Clear: require('@app/assets/conditions/clear.png'),
    Cloudy: require('@app/assets/conditions/cloudy.png'),
    'Partly cloudy': require('@app/assets/conditions/partly_cloudy.png'),
    Snow: require('@app/assets/conditions/snow.png'),
    Rain: require('@app/assets/conditions/rain.png'),
    'Moderate rain': require('@app/assets/conditions/rain.png'),
    'Light rain': require('@app/assets/conditions/rain.png'),
    Thunder: require('@app/assets/conditions/thunder.png'),
    Fog: require('@app/assets/conditions/fog.png'),
    Drizzle: require('@app/assets/conditions/drizzle.png'),
    Unknown: require('@app/assets/conditions/sunny.png'),
  };

  const source = images[condition] !== undefined ? images[condition] : images['Unknown'];

  return <Image source={source} style={{ width: size, height: size, ...style }} />;
};

export default WeatherIcon;
