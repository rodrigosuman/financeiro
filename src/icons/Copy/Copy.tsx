import React from 'react';
import Icon from 'react-native-vector-icons/Feather';
import { useTheme } from 'styled-components';

interface Props {
  size?: number;
  color?: string;
}

const Copy: React.FC<Props> = ({ size = 18, color }) => {
  const theme = useTheme();

  return (
    <Icon name="copy" color={color || theme.colors.secondary} size={size} />
  );
};

export default Copy;
