import { PADDING_HORIZONTAL } from '@app/settings/theme/Layout';
import { LinearGradient } from 'expo-linear-gradient';
import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import styled from 'styled-components/native';

const Background = styled.ImageBackground`
  flex: 1;
  width: 100%;
  height: 100%;
`;

const Container = styled.View`
  flex: 1;
  padding-horizontal: ${PADDING_HORIZONTAL}px;
`;

function AppContainer(props: AppContainerProps) {
  if (props.gradientBackground) {
    return (
      <LinearGradient colors={['#45278B', '#2E335A']} style={{ flex: 1 }}>
        <SafeAreaView style={{ flex: 1 }}>
          <Container>{props.children}</Container>
        </SafeAreaView>
      </LinearGradient>
    );
  }

  return (
    <Background source={require('@app/assets/background.png')}>
      <SafeAreaView style={{ flex: 1 }}>
        <Container>{props.children}</Container>
      </SafeAreaView>
    </Background>
  );
}

export interface AppContainerProps {
  gradientBackground?: boolean;
  children: React.ReactNode;
}

export default AppContainer;
