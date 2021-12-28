import React from 'react';
import { ActivityIndicator } from 'react-native';
import { useTheme } from 'styled-components';
import { LoadingProps } from './types';

// import { Container } from './styles';

const Loading: React.FC<LoadingProps> = props => {
  const { size = 30 } = props;
  const theme = useTheme();

  return <ActivityIndicator size={size} color={theme.colors.white + '35'} />;
};

export default Loading;
