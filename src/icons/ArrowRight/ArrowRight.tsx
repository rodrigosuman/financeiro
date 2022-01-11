import React from 'react';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useTheme } from 'styled-components';
import { KeyOfThemeColor } from '../../styles';

interface Props {
  size?: number;
  color?: KeyOfThemeColor;
}

const ArrowRight: React.FC<Props> = ({ size = 24, color = 'secondary' }) => {
  const theme = useTheme();

  return <Icon name="arrow-right" color={theme.colors[color]} size={size} />;
};

export default ArrowRight;
