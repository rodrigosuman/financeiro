import DateTimePicker from '@react-native-community/datetimepicker';
import { format } from 'date-fns';
import React from 'react';
import icons from '../../../icons';
import * as S from './styles';
import { DatePickerProps } from './types';

const DatePicker: React.FC<DatePickerProps> = props => {
  const { placeholder, onValue } = props;

  const [selectedDate, setSelectedDate] = React.useState<Date>(new Date());
  const [show, setShow] = React.useState<boolean>(false);

  const formatedDate = selectedDate ? format(selectedDate, 'dd/MM/yyyy') : '';

  const handleChangeDate = React.useCallback(
    (date: Date) => {
      setShow(false);

      setSelectedDate(date);
      onValue?.(date);
    },
    [onValue],
  );

  return (
    <React.Fragment>
      <S.Container onPress={() => setShow(true)}>
        <S.ValueWrapper>
          <S.ValueText>{formatedDate || placeholder}</S.ValueText>
        </S.ValueWrapper>
        {icons.CALENDAR({ size: 18 })}
      </S.Container>

      {show && (
        <DateTimePicker
          testID="dateTimePicker"
          value={selectedDate}
          mode="date"
          is24Hour={true}
          display="spinner"
          onChange={(event, date: any) => {
            handleChangeDate(date ? new Date(date) : selectedDate);
          }}
        />
      )}
    </React.Fragment>
  );
};

export default DatePicker;
