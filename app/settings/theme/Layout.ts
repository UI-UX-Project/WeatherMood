import { Dimensions } from 'react-native';
import {
  responsiveWidth as rw,
  responsiveHeight as rh,
  responsiveFontSize as rf,
  responsiveScreenFontSize as rsf,
  responsiveScreenHeight as rsh,
  responsiveScreenWidth as rsw,
} from 'react-native-responsive-dimensions';

export const WINDOW_WIDTH: number = Dimensions.get('window').width;
export const WINDOW_HEIGHT: number = Dimensions.get('window').height;

export const vw: (percent: number) => number = (percent) => {
  return (WINDOW_WIDTH * percent) / 100;
};

export const vh: (percent: number) => number = (percent) => {
  return (WINDOW_HEIGHT * percent) / 100;
};

export const PADDING_HORIZONTAL: number = rw(5);
export const CONTENT_MAX_WIDTH: number = rw(100) - 2 * PADDING_HORIZONTAL;
export const SCROLL_VIEW_STYLE = { marginHorizontal: rw(6), width: '100%' };

export { rw, rh, rf, rsf, rsh, rsw };
