import React from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useTheme } from 'styled-components';

// import { Container } from './styles';

const ArrowDown: React.FC = () => {
  const theme = useTheme();

  return <Icon name="arrow-downward" color={theme.colors.danger} size={18} />;
};

export default ArrowDown;
