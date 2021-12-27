import React from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useTheme } from 'styled-components';

interface Props {
  size?: number;
}

const ArrowUp: React.FC<Props> = ({ size = 18 }) => {
  const theme = useTheme();

  return <Icon name="arrow-upward" color={theme.colors.success} size={size} />;
};

export default ArrowUp;
