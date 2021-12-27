import React from 'react';
import * as S from './styles';
import { ButtonProps } from './types';

const Button: React.FC<ButtonProps> = props => {
  const { variant = 'primary', onPress, title } = props;
  return (
    <S.ButtonContainer activeOpacity={0.7} variant={variant} onPress={onPress}>
      <S.ButtonTitle>{title}</S.ButtonTitle>
    </S.ButtonContainer>
  );
};

export default Button;
