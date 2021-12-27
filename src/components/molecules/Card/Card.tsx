import React from 'react';
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
      <S.CardContent>{props.children}</S.CardContent>
    </S.Container>
  );
};

export default Card;
