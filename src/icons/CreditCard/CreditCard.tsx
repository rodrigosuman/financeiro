import React from 'react';
import Icon from 'react-native-vector-icons/Ionicons';
import { useTheme } from 'styled-components';
import { KeyOfThemeColor } from '../../styles';

interface Props {
  size?: number;
  color?: KeyOfThemeColor;
}

const CreditCard: React.FC<Props> = ({ size = 18, color }) => {
  const theme = useTheme();

  return <Icon name="card-outline" color={color ? theme.colors[color] : theme.colors.secondary} size={size} />;
};

export default CreditCard;
