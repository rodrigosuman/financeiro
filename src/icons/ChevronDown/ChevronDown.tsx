import React from 'react';
import Icon from 'react-native-vector-icons/Entypo';
import { useTheme } from 'styled-components';

interface Props {
  size?: number;
}

const ChevronDown: React.FC<Props> = ({ size = 18 }) => {
  const theme = useTheme();

  return (
    <Icon name="chevron-thin-down" color={theme.colors.white} size={size} />
  );
};

export default ChevronDown;
