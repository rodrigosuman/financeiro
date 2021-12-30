import React from 'react';
import Icon from 'react-native-vector-icons/EvilIcons';
import { useTheme } from 'styled-components';
import { KeyOfThemeColor } from '../../styles';

interface Props {
  size?: number;
  color?: KeyOfThemeColor;
}

const Minus: React.FC<Props> = ({ size = 18, color = 'white' }) => {
  const theme = useTheme();

  return <Icon name="minus" color={theme.colors[color]} size={size} />;
};

export default Minus;
