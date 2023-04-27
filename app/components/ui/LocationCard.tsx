import { LocationWeather } from '@app/api/LocationService';
import { useLocationsStore } from '@app/store/GlobalState';
import * as React from 'react';
import { Alert, Keyboard, StyleSheet, Text, View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Svg, { Defs, LinearGradient, Path, Stop } from 'react-native-svg';

import WeatherIcon from './WeatherIcon';

const Card = (props: any) => (
  <Svg
    xmlns='http://www.w3.org/2000/svg'
    width={342}
    height={175}
    viewBox='0 0 342 175'
    fill='none'
    style={{ marginBottom: 20, ...styles.elevation }}
    {...props}
  >
    <Path
      d='M0 66.4396C0 31.6455 0 14.2484 11.326 5.24044C22.6519 -3.76754 39.6026 0.147978 73.5041 7.97901L307.903 62.1238C324.259 65.9018 332.436 67.7909 337.218 73.8031C342 79.8154 342 88.2086 342 104.995V131C342 151.742 342 162.113 335.556 168.556C329.113 175 318.742 175 298 175H44C23.2582 175 12.8873 175 6.44365 168.556C0 162.113 0 151.742 0 131V66.4396Z'
      fill='url(#paint0_linear_508_1579)'
    />
    <Defs>
      <LinearGradient
        id='paint0_linear_508_1579'
        x1={0}
        y1={128}
        x2={354.142}
        y2={128}
        gradientUnits='userSpaceOnUse'
      >
        <Stop stopColor='#5936B4' />
        <Stop offset={1} stopColor='#4c3cba' />
      </LinearGradient>
    </Defs>
  </Svg>
);

const LocationCard = ({ location }: { location: LocationWeather }) => {
  const removeLocation = useLocationsStore((state) => state.removeLocation);

  const celsius = useLocationsStore((state) => state.celsius);

  const handleRemove = () => {
    removeLocation(location.name);
  };

  const goToLocationDetails = () => {
    // TODO: navigate to location details screen
  };

  const handleLongPress = () => {
    Alert.alert(
      'Remove Location',
      'Are you sure want to remove this location?',
      [
        { text: 'Yes', onPress: () => handleRemove() },
        {
          text: 'No',
          style: 'cancel',
        },
      ],
      { cancelable: false }
    );
  };

  const handleTouch = () => {
    Keyboard.dismiss();
    goToLocationDetails();
  };

  return (
    <TouchableOpacity onPress={handleTouch} onLongPress={handleLongPress}>
      <View style={{ position: 'relative' }}>
        <Card />

        <View style={{ position: 'absolute', zIndex: 1, top: 0, right: 10 }}>
          <WeatherIcon
            size={120}
            condition={location.weather?.current.condition.text ?? 'Unknown'}
          />
        </View>

        <View style={{ position: 'absolute', zIndex: 1, top: 25, left: 20 }}>
          <Text style={styles.temp}>
            {location.weather?.current[celsius ? 'temp_c' : 'temp_f'] ?? 'N/A'}°
          </Text>
        </View>

        <View style={{ position: 'absolute', zIndex: 1, bottom: 35, left: 20 }}>
          <Text style={styles.range}>
            H:
            {location.weather?.forecast.forecastday[0].day[celsius ? 'maxtemp_c' : 'maxtemp_f'] ??
              'N/A'}
            ° L:
            {location.weather?.forecast.forecastday[0].day[celsius ? 'mintemp_c' : 'mintemp_f'] ??
              'N/A'}
            °
          </Text>
          <Text style={styles.item}>{location.name}</Text>
        </View>

        <View style={{ position: 'absolute', zIndex: 1, bottom: 35, right: 35 }}>
          <Text style={styles.conditionText}>
            {location.weather?.current.condition.text ?? 'N/A'}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  item: {
    fontSize: 18,
    color: 'white',
  },
  temp: {
    fontSize: 65,
    fontWeight: '300',
    color: 'white',
  },
  range: {
    fontSize: 16,
    color: 'lightgrey',
  },
  conditionText: {
    fontSize: 14,
    color: 'white',
  },
  elevation: {
    shadowColor: '#171717',
    shadowOffset: { width: -2, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
});

export default LocationCard;
