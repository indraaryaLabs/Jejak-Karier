import { useColorScheme } from 'react-native';

export const colors = {
  paper: '#F6F2E9',
  surface: '#FFFCF5',
  ink: '#20342E',
  muted: '#6B7770',
  line: '#DADFD8',
  green: '#286052',
  greenSoft: '#DCEBE3',
  amber: '#A76A22',
  amberSoft: '#F8E8CB',
  red: '#A64B45',
  redSoft: '#F5DDDA',
  white: '#FFFFFF',
};

export function useAppColors() {
  const scheme = useColorScheme();
  return scheme === 'dark'
    ? { ...colors, paper: '#15221D', surface: '#20342E', ink: '#F6F2E9', muted: '#B7C2BA', line: '#385148' }
    : colors;
}
