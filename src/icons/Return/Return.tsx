import React from 'react';
import Icon from 'react-native-vector-icons/Ionicons';
import { useTheme } from 'styled-components';

interface Props {
  size?: number;
  color?: string;
}

const Return: React.FC<Props> = ({ size = 18, color }) => {
  const theme = useTheme();

  return <Icon name="return-up-back" color={color || theme.colors.secondary} size={size} />;
};

export default Return;
