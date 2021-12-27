import React from 'react';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useTheme } from 'styled-components';

interface Props {
  size?: number;
  color?: string;
}

const ArrowRight: React.FC<Props> = ({ size = 24, color }) => {
  const theme = useTheme();

  return (
    <Icon
      name="arrow-right"
      color={color || theme.colors.secondary}
      size={size}
    />
  );
};

export default ArrowRight;
