import React from 'react';
import useCurrencyFormater from '../../../hooks/useCurrencyFormater';
import * as S from './styles';
import { MounthResumeProps } from './types';

const MounthResume: React.FC<MounthResumeProps> = props => {
  const { credits, fixedDebts, variablesDebts } = props;

  const currencyFormater = useCurrencyFormater('BRL');

  const balance = credits - fixedDebts - variablesDebts;
  const _balance = currencyFormater.format(balance);
  const _credits = currencyFormater.format(credits);
  const _fixedDebts = currencyFormater.format(fixedDebts);
  const _variablesDebts = currencyFormater.format(variablesDebts);

  return (
    <S.Container>
      <S.ItemWrapper>
        <S.ItemText>(+) Entradas</S.ItemText>
        <S.ItemText>{_credits}</S.ItemText>
      </S.ItemWrapper>
      <S.ItemWrapper>
        <S.ItemText>(-) Despesas fixas</S.ItemText>
        <S.ItemText>{_fixedDebts}</S.ItemText>
      </S.ItemWrapper>
      <S.ItemWrapper>
        <S.ItemText>(-) Despesas variáveis</S.ItemText>
        <S.ItemText>{_variablesDebts}</S.ItemText>
      </S.ItemWrapper>

      <S.BalanceWrapper>
        <S.ItemText>(=) Saldo mensal</S.ItemText>
        <S.BalanceText color={balance > 0 ? 'success' : 'danger'}>
          {_balance}
        </S.BalanceText>
      </S.BalanceWrapper>
    </S.Container>
  );
};

export default MounthResume;
