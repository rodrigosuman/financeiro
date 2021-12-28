import React from 'react';
import Loading from '../../atoms/Loading/Loading';
import * as S from './styles';
import { CardProps } from './types';

const Card: React.FC<CardProps> = props => {
  const { title, right } = props.headerProps;
  return (
    <S.Container variant={props.variant}>
      <S.CardHeader>
        <S.CardTitle>{title}</S.CardTitle>
        {typeof right === 'function' ? right() : <></>}
      </S.CardHeader>
      <S.CardContent>
        {props.isLoading ? <Loading /> : props.children}
      </S.CardContent>
    </S.Container>
  );
};

export default Card;
