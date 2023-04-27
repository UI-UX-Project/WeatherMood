import { WeatherData, WeatherService } from '@app/api/WeatherService';
import AppContainer from '@app/components/layout/AppContainer';
import { InfoWidgetSmall } from '@app/components/ui/InfoWidget';
import WeatherIcon from '@app/components/ui/WeatherIcon';
import { rf, rh, rw } from '@app/settings/theme/Layout';
import { theme } from '@app/settings/theme/Theme';
import { useGlobalStore, useLocationsStore } from '@app/store/GlobalState';
import { Entypo } from '@expo/vector-icons';
import React, { useEffect, useState } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import styled from 'styled-components/native';

const BottomSheetContainer = styled.View`
  flex: 1;
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
  height: 40px;
`;

const ForecastCapsule = styled.View`
  flex-direction: column;
  justify-content: space-between;
  margin-horizontal: ${rw(2.5)}px;
  width: ${rw(15)}px;
  aspect-ratio: 1/2.3;
  background-color: #2f2161;
  border-radius: 100px;
  padding-vertical: ${rw(5)}px;
  align-items: center;
  border-color: white;
  border-width: 0.2px;
`;

const ForecastTitleText = styled.Text`
  font-size: ${rf(2)}px;
  color: white;
  font-weight: bold;
`;

const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

function WeatherInfoScreen({ navigation: { navigate, goBack } }: any) {
  const [forecast, setForecast] = useState<'hourly' | 'daily'>('hourly');

  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const selectedCity = useGlobalStore((state) => state.selectedCity);

  // const resetLocations = useLocationsStore((state) => state.resetLocations);
  const celsius = useLocationsStore((state) => state.celsius);

  useEffect(() => {
    (async function () {
      if (!selectedCity) return;

      const res = await WeatherService.getWeather(selectedCity);

      if (!res.ok) return;

      setWeatherData(res.data!);
    })();
  }, [selectedCity]);

  return (
    <>
      <AppContainer gradientBackground>
        <View style={styles.iconsContainer}>
          <Entypo name='chevron-left' size={30} color='white' onPress={goBack} />
        </View>

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
                      <ForecastTitleText>{hourWData.time.slice(-5)}</ForecastTitleText>
                      {weatherData?.current.condition && (
                        <WeatherIcon condition={hourWData.condition.text} size={40} />
                      )}
                      <ForecastTitleText>
                        {celsius ? hourWData.temp_c : hourWData.temp_f}
                      </ForecastTitleText>
                    </ForecastCapsule>
                  );
                })
              : null}
            {forecast === 'daily'
              ? weatherData?.forecast.forecastday.map((forecastDay, index) => {
                  return (
                    <ForecastCapsule key={index}>
                      <ForecastTitleText>
                        {days[new Date(forecastDay.date).getDay()].slice(0, 3)}
                      </ForecastTitleText>
                      {weatherData?.current.condition && (
                        <WeatherIcon condition={forecastDay.day.condition.text} size={40} />
                      )}
                      <ForecastTitleText>
                        {celsius ? forecastDay.day.avgtemp_c : forecastDay.day.avgtemp_f}
                      </ForecastTitleText>
                    </ForecastCapsule>
                  );
                })
              : null}
          </ForecastContainer>
          <ScrollView>
            <View style={styles.extraInfoContainer}>
              <InfoWidgetSmall
                title='Humidity'
                content={`${weatherData?.current.humidity}%`}
                description={weatherData?.current?.humidity ?? 0 > 50 ? 'Humid' : 'Dry'}
              />
              <InfoWidgetSmall
                title='Feels like'
                content={`${
                  celsius ? weatherData?.current.feelslike_c : weatherData?.current.feelslike_f
                }°`}
                description={
                  Math.abs(
                    (weatherData?.current?.temp_c ?? 0) - (weatherData?.current?.feelslike_c ?? 0)
                  ) < 4
                    ? 'Similar to the actual temperature.'
                    : 'Feels like a different temperature.'
                }
              />
              <InfoWidgetSmall
                title='Uv Index'
                content={`${weatherData?.current.uv}`}
                description=''
              />
              <InfoWidgetSmall
                title='Wind'
                content={`${weatherData?.current.wind_kph} kph`}
                description={weatherData?.current?.wind_kph ?? 0 > 10 ? 'Very windy' : 'Breeze'}
              />
            </View>
          </ScrollView>
        </BottomSheetContainer>
      </AppContainer>
    </>
  );
}

const styles = StyleSheet.create({
  extraInfoContainer: {
    flexWrap: 'wrap',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    flex: 1,
    gap: 20,
  },
  iconsContainer: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: '5%',
    paddingVertical: 0,
    margin: 0,
    marginBottom: 20,
  },
});

export interface WeatherInfoScreenProps {}

export default WeatherInfoScreen;
