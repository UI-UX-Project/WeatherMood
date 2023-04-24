import { WeatherData, WeatherService } from '@app/api/WeatherService';
import AppContainer from '@app/components/layout/AppContainer';
import { rf, rh, rw } from '@app/settings/theme/Layout';
import { theme } from '@app/settings/theme/Theme';
import { useGlobalStore } from '@app/store/GlobalState';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components/native';

// import { BlurView } from 'expo-blur';

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

// const ImageContainer = styled.View`
//   justify-content: center;
//   align-items: center;
//   flex: 1;
// `;

// const BlurContainer = styled(BlurView)`
//   width: ${rw(120)}px;
//   flex: 1;
//   background-color: rgba(103, 52, 52, 0);
//   margin-horizontal: ${-rw(10)}px;
// `;

// const House = styled.Image``;

function HomeScreen() {
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const currentCity = useGlobalStore((state) => state.currentCity);

  useEffect(() => {
    (async function () {
      if (!currentCity || currentCity === 'Loading...') return;

      const res = await WeatherService.getWeather(currentCity);

      if (!res.ok) return;

      setWeatherData(res.data!);
    })();
  }, [currentCity]);

  return (
    <AppContainer>
      <TopContainer>
        <City>{currentCity}</City>
        <Temperature>{weatherData?.current.temp_c}°</Temperature>
        <CloudsText>{weatherData?.current.condition.text}</CloudsText>
        <HighLowText>
          H:{weatherData?.forecast.forecastday[0].day.maxtemp_c}° L:{weatherData?.forecast.forecastday[0].day.mintemp_c}°
        </HighLowText>
      </TopContainer>
      {/* <ImageContainer><House source={require('@app/assets/house.png')} resizeMode='contain' /> </ImageContainer> */}
      {/* <BlurContainer intensity={2} /> */}
    </AppContainer>
  );
}

export interface HomeScreenProps {}

export default HomeScreen;
