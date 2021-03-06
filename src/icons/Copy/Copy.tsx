import React from 'react';
import Icon from 'react-native-vector-icons/Ionicons';
import { useTheme } from 'styled-components';

interface Props {
  size?: number;
  color?: string;
}

const Copy: React.FC<Props> = ({ size = 18, color }) => {
  const theme = useTheme();

  return <Icon name="ios-copy-outline" color={color || theme.colors.secondary} size={size} />;
};

export default Copy;
