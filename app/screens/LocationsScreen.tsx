import { LocationService } from '@app/api/LocationService';
import AppContainer from '@app/components/layout/AppContainer';
import LocationCard from '@app/components/ui/LocationCard';
import useDebounce from '@app/hooks/useDebounce';
import { useLocationsStore } from '@app/store/GlobalState';
import { Entypo } from '@expo/vector-icons';
import React, { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  FlatList,
  Keyboard,
  StyleSheet,
  Text,
  TextInput,
  TouchableWithoutFeedback,
  View,
} from 'react-native';

const LocationList = ({ locations, handleAdd, previewOnly }: any) => {
  return (
    <FlatList
      data={locations}
      renderItem={({ item }) => (
        <LocationCard location={item} previewOnly={previewOnly} handleAdd={handleAdd} />
      )}
    />
  );
};

const SearchResults = ({ loading, results, handleAdd }: any) => {
  return (
    <View style={{ flex: 1 }}>
      {loading && <ActivityIndicator animating={true} color='white' size={'large'} />}

      {results.length > 0 && <LocationList locations={results} handleAdd={handleAdd} />}

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

  return (
    <View style={{ flex: 1 }}>
      {myLocations.length > 0 && <LocationList locations={myLocations} previewOnly={true} />}
      {myLocations.length === 0 && (
        <View style={styles.textContainer}>
          <Text style={styles.text}>No locations added</Text>
        </View>
      )}
    </View>
  );
};

function LocationsScreen({ navigation: { goBack } }: any) {
  const [locations, setLocations] = useState<any[]>([]);
  const [search, setSearch] = useState<string | undefined>(undefined);
  const [searchMode, setSearchMode] = useState<boolean>(false);
  const [loading, setLoading] = useState(false);
  const addLocation = useLocationsStore((state) => state.addLocation);

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
      setSearchMode(false);
      setLocations([]);
    }
  }, [debouncedSearch]);

  return (
    <AppContainer gradientBackground={true}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
        <View style={{ flex: 1 }}>
          <Entypo name='chevron-left' size={30} color='white' onPress={goBack} />

          <TextInput
            style={styles.textInputStyle}
            onChangeText={(text) => setSearch(text)}
            value={search}
            underlineColorAndroid='transparent'
            placeholder='Search location...'
            placeholderTextColor={'lightgrey'}
          />
          {!searchMode && <MyLocations />}
          {searchMode && (
            <SearchResults loading={loading} results={locations} handleAdd={handleAdd} />
          )}
        </View>
      </TouchableWithoutFeedback>
    </AppContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexGrow: 1,
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
    height: 40,
    borderWidth: 1,
    paddingLeft: 20,
    margin: 5,
    borderRadius: 10,
    color: 'white',
    borderColor: 'black',
    backgroundColor: '#2E335A',
  },
});

export interface LocationsScreenProps {}

export default LocationsScreen;
