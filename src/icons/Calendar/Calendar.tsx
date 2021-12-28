import React from 'react';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useTheme } from 'styled-components';

interface Props {
  size?: number;
}

const Calendar: React.FC<Props> = ({ size = 18 }) => {
  const theme = useTheme();

  return <Icon name="calendar-month" color={theme.colors.white} size={size} />;
};

export default Calendar;
