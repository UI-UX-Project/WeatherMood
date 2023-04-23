import { createNavigationContainerRef, StackActions } from '@react-navigation/native';
import { RootStackProps } from 'App';
import { BackHandler } from 'react-native';

export const androidBackButtonExitApp = () => {
  BackHandler.exitApp();
  return true;
};
export const preventAndroidBackBtn = () => {
  return true;
};

type CombinedStackProps = RootStackProps;
export const navigationRef = createNavigationContainerRef<CombinedStackProps>();

export const setScreenRef = (nameRef: any) => {
  nameRef.current = navigationRef.getCurrentRoute()?.name ?? '';
};
export function navigate(name: keyof RootStackProps, params: object | undefined = {}) {
  navigationRef.isReady() && navigationRef.navigate(name, params);
}

export const push = (name: keyof RootStackProps, params?: object) => {
  navigationRef.isReady() && navigationRef.dispatch(StackActions.push(name, params ?? {}));
};

export const pop = (number: number = 1) => {
  navigationRef.isReady() && navigationRef.dispatch(StackActions.pop(number));
};

export function replace(name: keyof RootStackProps, params: object | undefined = {}) {
  navigationRef.isReady() && navigationRef.dispatch(StackActions.replace(name, params));
}

export function goBack() {
  navigationRef.isReady() && navigationRef.goBack();
}

export function reset(screenName: keyof RootStackProps, params: object = {}) {
  navigationRef.isReady() &&
    navigationRef.reset({
      index: 0,
      routes: [
        {
          name: screenName,
          params,
        },
      ],
    });
}

const RootNavigation = {
  navigate,
  replace,
  push,
  pop,
  goBack,
  reset,
};

export default RootNavigation;
