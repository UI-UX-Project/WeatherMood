import { WeatherData, WeatherService } from '@app/api/WeatherService';
import AppContainer from '@app/components/layout/AppContainer';
import WeatherIcon from '@app/components/ui/WeatherIcon';
import { rf, rh, rw } from '@app/settings/theme/Layout';
import { theme } from '@app/settings/theme/Theme';
import { useGlobalStore, useLocationsStore } from '@app/store/GlobalState';
import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { Button, Image, StyleSheet, Text, View } from 'react-native';
import styled from 'styled-components/native';
import { BlurView } from 'expo-blur';

import { LOCATIONS_SCREEN } from './ScreenNames';

import BottomSheet from '@gorhom/bottom-sheet';

const City = styled.Text`
  color: white;
  font-size: ${rf(5)}px;
  font-family: ${theme.fonts.interRegular};
`;

const Temperature = styled.Text`
  color: white;
  font-size: ${rf(10)}px;
  font-family: ${theme.fonts.interLight};
  margin-vertical: ${rw(1)}px;
`;

const CloudsText = styled.Text`
  color: #a5a7c1;
  font-size: ${rf(2.8)}px;
  font-family: ${theme.fonts.interBold};
`;

const HighLowText = styled.Text`
  color: white;
  font-size: ${rf(2.5)}px;
  margin-top: ${rw(1)}px;
`;

const TopContainer = styled.View`
  justify-content: space-evenly;
  align-items: center;
  height: ${rh(30)}px;
  margin-top: ${rw(5)}px;
  border-radius: 20px;
  margin-bottom: ${rw(10)}px;
`;

const BottomSheetContainer = styled.View`
  flex: 1;
`;

const TabBar = styled.Image``;

const TabBarContainer = styled.TouchableOpacity`
  position: absolute;
  bottom: 0;
  left: ${rw(19)}px;
  z-index: 10;
`;

const Divider = styled.View`
  width: ${rw(100)}px;
  background-color: rgba(255, 255, 255, 0.8);
  height: 1px;
  margin-vertical: ${rw(5)}px;
`;

const ForeCastTextContainer = styled.View`
  flex-direction: row;
  justify-content: space-between;
  padding-horizontal: ${rw(5)}px;
`;

const ForecastText = styled.Text`
  color: #af9ec1;
  font-size: ${rf(1.8)}px;
`;

const ForecastContainer = styled.ScrollView`
  flex-direction: row;
  height: ${rh(14)}px;
  /* background-color: red; */
`;

const ForecastCapsule = styled.View`
  flex-direction: column;
  justify-content: space-between;
  margin-horizontal: ${rw(3)}px;
  width: ${rw(14)}px;
  aspect-ratio: 1/2.3;
  background-color: #2f2161;
  border-radius: 100px;
  padding-vertical: ${rw(2.5)}px;
  align-items: center;
  border-color: white;
  border-width: 0.2px; 
`;

const ForecastTitleText = styled.Text`
  font-size: ${rf(2)}px;
  color: white;
  font-weight: bold;
`;

function HomeScreen({ navigation: { navigate } }: any) {
  const [buttonVisible, setButtonVisible] = useState(true);
  const [forecast, setForecast] = useState<'hourly' | 'daily'>('hourly');

  // ref
  const bottomSheetRef = useRef<BottomSheet>(null);

  // variables
  const snapPoints = useMemo(() => ['38%', '85%'], []);

  // callbacks
  const handleSheetChanges = useCallback((index: number) => {
    // console.log('handleSheetChanges', index);
    index === 0 && setButtonVisible(true);
    index === 1 && setButtonVisible(false);
  }, []);

  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const currentCity = useGlobalStore((state) => state.currentCity);

  // const resetLocations = useLocationsStore((state) => state.resetLocations);
  const celsius = useLocationsStore((state) => state.celsius);

  useEffect(() => {
    (async function () {
      if (!currentCity || currentCity === 'Loading...') return;

      const res = await WeatherService.getWeather(currentCity);

      if (!res.ok) return;

      setWeatherData(res.data!);
    })();
  }, [currentCity]);

  const goToLocations = () => {
    navigate(LOCATIONS_SCREEN);
  };

  return (
    <>
      <AppContainer>
        <TopContainer>
          <City>{currentCity}</City>
          <Temperature>{weatherData?.current[celsius ? 'temp_c' : 'temp_f']}°</Temperature>
          {weatherData?.current.condition && (
            <WeatherIcon condition={weatherData?.current.condition.text} />
          )}
          <CloudsText>{weatherData?.current.condition.text}</CloudsText>
          <HighLowText>
            H:{weatherData?.forecast.forecastday[0].day[celsius ? 'maxtemp_c' : 'maxtemp_f']}° L:
            {weatherData?.forecast.forecastday[0].day[celsius ? 'mintemp_c' : 'mintemp_f']}°
          </HighLowText>
        </TopContainer>
        {/* <Button onPress={goToLocations} color='white' title='Locations' />
        <Button onPress={resetLocations} color='red' title='Reset My Locations' /> */}
      </AppContainer>
      {buttonVisible && (
        <TabBarContainer activeOpacity={0.7} onPress={goToLocations}>
          <TabBar source={require('@app/assets/tabBar1.png')} resizeMode='cover' />
        </TabBarContainer>
      )}
      <BottomSheet
        ref={bottomSheetRef}
        index={0}
        snapPoints={snapPoints}
        onChange={handleSheetChanges}
        backgroundStyle={{ backgroundColor: 'rgba(72, 49, 157, 1)', borderRadius: rw(8) }}
        handleIndicatorStyle={{ padding: rw(0.7) }}
        backdropComponent={() => <BlurView intensity={20} />}
      >
        <BottomSheetContainer>
          <ForeCastTextContainer>
            <ForecastText
              style={forecast === 'hourly' ? { color: 'white' } : null}
              onPress={() => setForecast('hourly')}
            >
              Hourly Forecast
            </ForecastText>
            <ForecastText
              style={forecast === 'daily' ? { color: 'white' } : null}
              onPress={() => setForecast('daily')}
            >
              Daily Forecast
            </ForecastText>
          </ForeCastTextContainer>
          <Divider />
          <ForecastContainer horizontal>
            {forecast === 'hourly'
              ? weatherData?.forecast.forecastday[0].hour.map((hourWData, index) => {
                  return (
                    <ForecastCapsule key={index}>
                      <ForecastTitleText>{hourWData.time.slice(-4)}</ForecastTitleText>
                      <ForecastTitleText>
                        {celsius ? hourWData.temp_c : hourWData.temp_f}
                      </ForecastTitleText>
                    </ForecastCapsule>
                  );
                })
              : null}
          </ForecastContainer>
        </BottomSheetContainer>
      </BottomSheet>
    </>
  );
}

export interface HomeScreenProps {}

export default HomeScreen;
