import React from 'react';
import Icon from 'react-native-vector-icons/EvilIcons';
import { useTheme } from 'styled-components';

interface Props {
  size?: number;
}

const Close: React.FC<Props> = ({ size = 18 }) => {
  const theme = useTheme();

  return <Icon name="close" color={theme.colors.white} size={size} />;
};

export default Close;
