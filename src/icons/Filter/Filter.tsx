import React from 'react';
import Icon from 'react-native-vector-icons/Ionicons';
import { useTheme } from 'styled-components';

interface Props {
  size?: number;
}

const Filter: React.FC<Props> = ({ size = 18 }) => {
  const theme = useTheme();

  return <Icon name="md-filter" color={theme.colors.white} size={size} />;
};

export default Filter;
