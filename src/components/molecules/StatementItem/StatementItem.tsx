import { format } from 'date-fns';
import React from 'react';
import useCurrencyFormater from '../../../hooks/useCurrencyFormater';
import icons from '../../../icons';
import * as S from './styles';
import { StatemetItemProps } from './types';

const StatementItem: React.FC<StatemetItemProps> = props => {
  const { onPress, itemProps } = props;

  const value = useCurrencyFormater('BRL').format(itemProps.value);
  const statamenteDate = format(itemProps.statamenteDate, 'dd/MM/yyyy');

  return (
    <S.Container activeOpacity={0.7} disabled={!onPress} onPress={onPress} status={itemProps.status}>
      <S.ItemHeader>
        <S.TitleWrapper>
          {icons[itemProps.type] ? <S.IconWrapper>{icons[itemProps.type]()}</S.IconWrapper> : <></>}
          <S.ItemTitle>{itemProps.title}</S.ItemTitle>
        </S.TitleWrapper>
        <S.ItemTitle>{value}</S.ItemTitle>
      </S.ItemHeader>
      <S.StatementDateWrapper>
        <S.StatementDateText>{statamenteDate}</S.StatementDateText>
      </S.StatementDateWrapper>
    </S.Container>
  );
};

export default StatementItem;
