import React from 'react';
import { View } from 'react-native';
import Loading from '../Loading/Loading';
import * as S from './styles';
import { ButtonProps } from './types';

const Button: React.FC<ButtonProps> = props => {
  const { variant = 'primary', onPress, title, isSending = false } = props;
  return (
    <S.ButtonContainer
      activeOpacity={0.7}
      variant={variant}
      onPress={onPress}
      isSending={isSending}
      disabled={isSending}>
      <S.ButtonTitle isSending={isSending}>{title}</S.ButtonTitle>
      {isSending && (
        <View style={{ marginLeft: 10 }}>
          <Loading size={18} />
        </View>
      )}
    </S.ButtonContainer>
  );
};

export default Button;
