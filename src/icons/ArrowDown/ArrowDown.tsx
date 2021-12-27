import React from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useTheme } from 'styled-components';

interface Props {
  size?: number;
}

const ArrowDown: React.FC<Props> = ({ size = 18 }) => {
  const theme = useTheme();

  return <Icon name="arrow-downward" color={theme.colors.danger} size={size} />;
};

export default ArrowDown;
