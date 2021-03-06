import DateTimePicker from '@react-native-community/datetimepicker';
import { useField } from '@unform/core';
import { format } from 'date-fns';
import React from 'react';
import icons from '../../../icons';
import * as S from './styles';
import { DatePickerProps } from './types';

const DatePicker: React.FC<DatePickerProps> = props => {
  const { placeholder, onValue, name, display = 'calendar' } = props;

  const datePickerRef = React.useRef<any>(null);
  const [selectedDate, setSelectedDate] = React.useState<Date | undefined>();
  const [show, setShow] = React.useState<boolean>(false);
  const { fieldName, registerField, error } = useField(name);

  const formatedDate = selectedDate ? format(selectedDate, 'dd/MM/yyyy') : '';

  const handleChangeDate = React.useCallback(
    (date: Date) => {
      setShow(false);

      setSelectedDate(date);
      onValue?.(date);
    },
    [onValue],
  );

  React.useEffect(() => {
    datePickerRef.current.value = selectedDate;
  }, [selectedDate]);

  React.useEffect(() => {
    registerField({
      name: fieldName,
      ref: datePickerRef.current,
      getValue() {
        if (datePickerRef.current) {
          return datePickerRef.current.value;
        }
        return '';
      },
      setValue(ref, value: string) {
        if (datePickerRef.current) {
          value && setSelectedDate(new Date(value));
          datePickerRef.current.value = value;
        }
      },
      clearValue() {
        if (datePickerRef.current) {
          setSelectedDate(undefined);
          datePickerRef.current.value = undefined;
        }
      },
    });
  }, [fieldName, registerField]);

  return (
    <React.Fragment>
      <S.Container ref={datePickerRef} onPress={() => setShow(true)}>
        <S.ValueWrapper>
          <S.ValueText>{formatedDate || placeholder}</S.ValueText>
        </S.ValueWrapper>
        {icons.CALENDAR({ size: 18 })}
      </S.Container>

      {show && (
        <DateTimePicker
          testID="dateTimePicker"
          value={selectedDate || new Date()}
          mode="date"
          is24Hour={true}
          display={display}
          minimumDate={props.minimumDate}
          maximumDate={props.maximumDate}
          onChange={(event, date: any) => {
            handleChangeDate(date ? new Date(date) : selectedDate ? selectedDate : new Date());
          }}
        />
      )}
    </React.Fragment>
  );
};

export default DatePicker;
