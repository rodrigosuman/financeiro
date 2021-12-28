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

  const _formatedDate = format(date, 'MMMM', {
    locale: brazilianLocale,
  });

  const _formatedYear = format(date, 'yyyy', {
    locale: brazilianLocale,
  });

  const handleMounth = React.useCallback(
    (handle: number) => {
      setDate(old => {
        const newDate = addMonths(old, handle);

        if (typeof onPaginate === 'function') {
          onPaginate?.({
            year: newDate.getFullYear(),
            mounth: newDate.getMonth() + 1,
          });
        }

        return newDate;
      });
    },
    [onPaginate],
  );

  return (
    <S.Container>
      <S.HandlersWrapper>
        <TouchableOpacity onPress={() => handleMounth(-1)}>
          {icons.ARROW_LEFT()}
        </TouchableOpacity>
        <S.MounthTitle>{_formatedDate}</S.MounthTitle>
        <TouchableOpacity onPress={() => handleMounth(1)}>
          {icons.ARROW_RIGHT()}
        </TouchableOpacity>
      </S.HandlersWrapper>

      <S.MounthTitleWrapper>
        <S.YearText>{_formatedYear}</S.YearText>
      </S.MounthTitleWrapper>
    </S.Container>
  );
};

export default MounthPagination;
