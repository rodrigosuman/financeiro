import React from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useTheme } from 'styled-components';
import { KeyOfThemeColor } from '../../styles';

interface Props {
  size?: number;
  color?: KeyOfThemeColor;
}

const Close: React.FC<Props> = ({ size = 18, color = 'white' }) => {
  const theme = useTheme();

  return <Icon name="trash-o" color={theme.colors[color]} size={size} />;
};

export default Close;
