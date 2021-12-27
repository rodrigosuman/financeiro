import React from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useTheme } from 'styled-components';

// import { Container } from './styles';

const ArrowUp: React.FC = () => {
  const theme = useTheme();

  return <Icon name="arrow-upward" color={theme.colors.success} size={18} />;
};

export default ArrowUp;
