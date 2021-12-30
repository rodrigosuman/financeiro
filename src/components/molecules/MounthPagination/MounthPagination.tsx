import DateTimePicker from '@react-native-community/datetimepicker';
import { addMonths, format } from 'date-fns';
import brazilianLocale from 'date-fns/locale/pt-BR';
import React from 'react';
import { TouchableOpacity } from 'react-native';
import icons from '../../../icons';
import * as S from './styles';
import { MounthPaginationProps } from './types';

const MounthPagination: React.FC<MounthPaginationProps> = props => {
  const { onPaginate } = props;
  const [date, setDate] = React.useState<Date>(new Date());
  const [show, setShow] = React.useState<boolean>(false);

  const _formatedDate = format(date, 'MMMM', {
    locale: brazilianLocale,
  });

  const _formatedYear = format(date, 'yyyy', {
    locale: brazilianLocale,
  });

  const handleOnPaginate = React.useCallback(
    (date: Date) => {
      if (typeof onPaginate === 'function') {
        onPaginate?.({
          year: date.getFullYear(),
          mounth: date.getMonth() + 1,
        });
      }
    },
    [onPaginate],
  );

  const handleMounth = React.useCallback(
    (handle: number) => {
      setDate(old => {
        const newDate = addMonths(old, handle);

        handleOnPaginate(newDate);
        return newDate;
      });
    },
    [handleOnPaginate],
  );

  return (
    <React.Fragment>
      <S.Container>
        <TouchableOpacity onPress={() => handleMounth(-1)}>
          <S.IconWrapper>{icons.ARROW_LEFT()}</S.IconWrapper>
        </TouchableOpacity>

        <S.HandlersWrapper onPressOut={() => setShow(true)}>
          <S.MounthTitle>{_formatedDate}</S.MounthTitle>
          <S.MounthTitleWrapper>
            <S.YearText>{_formatedYear}</S.YearText>
          </S.MounthTitleWrapper>
        </S.HandlersWrapper>

        <TouchableOpacity onPress={() => handleMounth(1)}>
          <S.IconWrapper>{icons.ARROW_RIGHT()}</S.IconWrapper>
        </TouchableOpacity>
      </S.Container>

      {show && (
        <DateTimePicker
          testID="dateTimePicker"
          value={date}
          mode="date"
          display="spinner"
          onChange={(event, newDate: any) => {
            setShow(false);
            if (newDate) {
              setDate(newDate);
              handleOnPaginate(newDate);
            } else {
              setDate(date);
            }
          }}
        />
      )}
    </React.Fragment>
  );
};

export default MounthPagination;
