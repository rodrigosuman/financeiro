import { Form } from '@unform/mobile';
import { addMonths, format } from 'date-fns';
import brazilianLocale from 'date-fns/locale/pt-BR';
import moment from 'moment';
import React from 'react';
import { TouchableOpacity } from 'react-native';
import icons from '../../../icons';
import MounthSelector from '../../atoms/MounthSelector/MounthSelector';
import { MounthSelectorRef, OnMounthSelectorChangeArgs } from '../../atoms/MounthSelector/types';
import * as S from './styles';
import { MounthPaginationProps } from './types';

const MounthPagination: React.FC<MounthPaginationProps> = props => {
  const { onPaginate } = props;
  const [date, setDate] = React.useState<Date>(new Date());

  const mounthSelectorRef = React.useRef<MounthSelectorRef>({ toggleVisible: () => {} });

  const _formatedDate = format(date, 'MMMM', {
    locale: brazilianLocale,
  });

  const _formatedYear = format(date, 'yyyy', {
    locale: brazilianLocale,
  });

  const handleOnPaginate = React.useCallback(
    (args: OnMounthSelectorChangeArgs) => {
      setDate(new Date(`${args.year}-${args.mounth > 9 ? args.mounth : `0${args.mounth}`}-15`));
      if (typeof onPaginate === 'function') {
        onPaginate?.(args);
      }
    },
    [onPaginate],
  );

  const handleMounth = React.useCallback(
    (handle: number) => {
      setDate(old => {
        const newDate = addMonths(old, handle);

        handleOnPaginate({ mounth: newDate.getMonth() + 1, year: newDate.getFullYear() });
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

        <S.HandlersWrapper onPress={() => mounthSelectorRef.current?.toggleVisible?.()}>
          <S.MounthTitle>{_formatedDate}</S.MounthTitle>
          <S.MounthTitleWrapper>
            <S.YearText>{_formatedYear}</S.YearText>
          </S.MounthTitleWrapper>
        </S.HandlersWrapper>

        <TouchableOpacity onPress={() => handleMounth(1)}>
          <S.IconWrapper>{icons.ARROW_RIGHT()}</S.IconWrapper>
        </TouchableOpacity>
      </S.Container>

      <Form onSubmit={console.log}>
        <MounthSelector
          onChange={args => {
            handleOnPaginate(args);
          }}
          renderInput={false}
          ref={mounthSelectorRef}
          initalValue={moment(date)}
          name="mounth"
        />
      </Form>
    </React.Fragment>
  );
};

export default MounthPagination;
