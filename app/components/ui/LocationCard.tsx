import { Text, View, StyleSheet } from 'react-native';
import WeatherIcon from './WeatherIcon';
import { Swipeable, TouchableOpacity } from 'react-native-gesture-handler';
import { useRef } from 'react';
import { useLocationsStore } from '@app/store/GlobalState';

const LocationCard = ({ location, handleAdd, previewOnly }: any) => {
  const removeLocation = useLocationsStore((state) => state.removeLocation);

  const swipeableRef = useRef(null);

  const handleRemove = () => {
    removeLocation(location.name);
  };

  const goToLocationDetails = () => {
    // TODO: navigate to location details screen
  };

  const renderRightActions = () => {
    if (!previewOnly) {
      return null;
    }

    return (
      <TouchableOpacity
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          padding: 10,
          marginBottom: 10,
          backgroundColor: 'red',
        }}
        onPress={handleRemove}
      >
        <Text style={{ color: 'white' }}>Remove</Text>
      </TouchableOpacity>
    );
  };

  return (
    <Swipeable ref={swipeableRef} renderRightActions={renderRightActions} rightThreshold={-100}>
      <TouchableOpacity onPress={previewOnly ? goToLocationDetails : () => handleAdd(location)}>
        <View
          style={{
            borderBottomWidth: 1,
            marginBottom: 10,
            borderColor: '#5936B4',
            padding: 10,
            backgroundColor: '#5936B4',
          }}
        >
          <Text style={styles.item}>{location.name}</Text>
          <WeatherIcon condition='Sunny' />
        </View>
      </TouchableOpacity>
    </Swipeable>
  );
};

const styles = StyleSheet.create({
  item: {
    fontSize: 18,
    marginBottom: 5,
  },
});

export default LocationCard;
