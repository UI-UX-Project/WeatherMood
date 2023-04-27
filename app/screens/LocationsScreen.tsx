import { LocationService, LocationWeather } from '@app/api/LocationService';
import { WeatherService } from '@app/api/WeatherService';
import AppContainer from '@app/components/layout/AppContainer';
import LocationCard from '@app/components/ui/LocationCard';
import useDebounce from '@app/hooks/useDebounce';
import { rf, rw } from '@app/settings/theme/Layout';
import { useLocationsStore } from '@app/store/GlobalState';
import { Entypo, Feather } from '@expo/vector-icons';
import React, { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  FlatList,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  TouchableWithoutFeedback,
} from 'react-native';
import styled from 'styled-components/native';

const LocationList = ({ locations }: any) => {
  return <FlatList data={locations} renderItem={({ item }) => <LocationCard location={item} />} />;
};

const ResultsList = ({ locations, handleAdd }: any) => {
  return (
    <FlatList
      data={locations}
      renderItem={({ item }) => (
        <TouchableOpacity style={styles.result} onPress={() => handleAdd(item)}>
          <View>
            <Text style={styles.resultText}>{`${item.name}, ${item.country}`}</Text>
          </View>
        </TouchableOpacity>
      )}
    />
  );
};

const SearchResults = ({ loading, results, handleAdd }: any) => {
  return (
    <View style={{ flex: 1 }}>
      {loading && <ActivityIndicator animating color='white' size='large' />}

      {results.length > 0 && <ResultsList locations={results} handleAdd={handleAdd} />}

      {!loading && results.length === 0 && (
        <View style={styles.textContainer}>
          <Text style={styles.text}>No results found</Text>
        </View>
      )}
    </View>
  );
};

const MyLocations = () => {
  const myLocations = useLocationsStore((state) => state.locations);

  const [data, setData] = useState<LocationWeather[]>([]);

  useEffect(() => {
    async function fetchData() {
      const res = await WeatherService.getWeatherForAll(myLocations.map((l) => l.name));

      const results: LocationWeather[] = myLocations.map((location, index) => ({
        ...location,
        weather: res[index].ok ? res[index].data : null,
      }));

      setData(results);
    }

    fetchData();
  }, [myLocations]);

  return (
    <View style={{ flex: 1 }}>
      {data.length > 0 && <LocationList locations={data} />}
      {data.length === 0 && (
        <View style={styles.textContainer}>
          <Text style={styles.text}>No locations added</Text>
        </View>
      )}
    </View>
  );
};

const ToolTip = styled.View`
  width: ${rw(40)}px;
  height: ${rw(20)}px;
  background-color: rgba(20, 20, 20, 0.8);
  position: absolute;
  z-index: 2;
  padding: 10px;
  right: ${rw(15)}px;
  top: ${rw(20)}px;
  border-radius: ${rw(5)}px;
  border-top-right-radius: 0;
`;

const MenuOption = styled.TouchableOpacity`
  margin-vertical: ${rw(1.8)}px;
`;

function LocationsScreen({ navigation: { goBack } }: any) {
  const [locations, setLocations] = useState<any[]>([]);
  const [search, setSearch] = useState<string | undefined>(undefined);
  const [searchMode, setSearchMode] = useState<boolean>(false);
  const [loading, setLoading] = useState(false);
  const addLocation = useLocationsStore((state) => state.addLocation);

  const { celsius, toggleCelsius } = useLocationsStore((state) => ({
    celsius: state.celsius,
    toggleCelsius: state.toggleCelsius,
  }));

  const [menuVisible, setMenuVisible] = useState<boolean>(false);

  const handleAdd = (location: any) => {
    addLocation(location);
    setLocations([]);
    setSearchMode(false);
    setSearch(undefined);
  };

  const debouncedSearch = useDebounce(search, 500);

  useEffect(() => {
    // search the api

    async function fetchData() {
      setLoading(true);

      setLocations([]);

      const res = await LocationService.getLocations(search ?? '');

      const results = res.data ?? [];
      setLocations(results);

      setLoading(false);
    }

    if (debouncedSearch) {
      setSearchMode(true);
      fetchData();
    } else {
      setLocations([]);
    }
  }, [debouncedSearch]);

  const hasText = debouncedSearch && debouncedSearch.length > 0;

  const handleBlur = () => {
    if (!hasText) {
      setSearchMode(false);
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
      {menuVisible && (
        <ToolTip>
          <MenuOption
            onPress={() => {
              if (!celsius) toggleCelsius();
              setMenuVisible(false);
            }}
          >
            <Text style={{ color: 'white', fontSize: rf(1.8) }}>Celsius</Text>
          </MenuOption>
          <MenuOption
            onPress={() => {
              if (celsius) toggleCelsius();
              setMenuVisible(false);
            }}
          >
            <Text style={{ color: 'white', fontSize: rf(1.8) }}>Fahrenheit</Text>
          </MenuOption>
        </ToolTip>
      )}
      <AppContainer gradientBackground>
        <View style={{ flex: 1 }}>
          <View style={styles.iconsContainer}>
            <Entypo name='chevron-left' size={30} color='white' onPress={goBack} />
            <Feather
              name='more-horizontal'
              size={24}
              color='white'
              onPress={() => setMenuVisible((old) => !old)}
            />
          </View>
          <View style={styles.inner}>
            <TextInput
              onFocus={() => setSearchMode(true)}
              onBlur={handleBlur}
              style={styles.textInputStyle}
              onChangeText={(text) => setSearch(text)}
              value={search}
              underlineColorAndroid='transparent'
              placeholder='Search location...'
              placeholderTextColor='lightgrey'
            />
            {!searchMode && <MyLocations />}
            {searchMode && hasText && (
              <SearchResults loading={loading} results={locations} handleAdd={handleAdd} />
            )}

            {searchMode && !hasText && (
              <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <View style={{ flex: 1 }} />
              </TouchableWithoutFeedback>
            )}
          </View>
        </View>
      </AppContainer>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  iconsContainer: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: '5%',
    paddingVertical: 0,
    margin: 0,
  },
  container: {
    flex: 1,
    flexGrow: 1,
  },
  inner: {
    padding: 15,
    flex: 1,
  },
  textContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
  },
  text: {
    color: 'white',
  },
  textInputStyle: {
    marginBottom: 20,
    height: 40,
    borderWidth: 1,
    paddingLeft: 20,
    margin: 5,
    borderRadius: 10,
    color: 'white',
    borderColor: 'black',
    backgroundColor: '#2E335A',
  },
  result: {
    width: '100%',
    padding: 10,
    marginBottom: 10,
    backgroundColor: '#5936B4',
    borderRadius: 10,
  },
  resultText: {
    color: 'white',
  },
});

export interface LocationsScreenProps {}

export default LocationsScreen;
