import { responsiveFontSize as rf } from 'react-native-responsive-dimensions';

const fonts = {
  interThin: 'Inter_100Thin',
  interExtraLight: 'Inter_200ExtraLight',
  interLight: 'Inter_300Light',
  interRegular: 'Inter_400Regular',
  interMedium: 'Inter_500Medium',
  interSemiBold: 'Inter_600SemiBold',
  interBold: 'Inter_700Bold',
  interExtraBold: 'Inter_800ExtraBold',
  interBlack: 'Inter_900Black',
};

const weights = {
  THIN: '100',
  ULTRA_THIN: '200',
  LIGHT: '300',
  REGULAR: '400',
  MEDIUM: '500',
  SEMI_BOLD: '600',
  BOLD: '700',
  HEAVY: '800',
  BLACK: '900',
};

const sizes = {
  XS5: rf(1),
  XS4: rf(1.5),
  XS3: rf(2),
  XS2: rf(2.5),
  XS: rf(3),
  S: rf(3.5),
  M: rf(4),
  L: rf(4.5),
  XL: rf(5),
  XL2: rf(5.5),
  XL3: rf(6),
  XL4: rf(6.5),
  XL5: rf(7),
};

export default {
  ...fonts,
  weights,
  sizes,
};
