import { PADDING_HORIZONTAL } from '@app/settings/theme/Layout';
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
  return (
    <Background source={require('@app/assets/background.png')}>
      <SafeAreaView style={{ flex: 1 }}>
        <Container>{props.children}</Container>
      </SafeAreaView>
    </Background>
  );
}

export interface AppContainerProps {
  children: React.ReactNode;
}

export default AppContainer;
