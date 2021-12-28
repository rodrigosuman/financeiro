import React from 'react';
import icons from '../../../icons';
import * as S from './styles';
import { FlutuationProp } from './types';

const Flutuation: React.FC<FlutuationProp> = props => {
  const { flutuation, showIcon = true, isLoading } = props;

  const size = 15;
  const icon = flutuation > 0 ? icons.CREDIT({ size }) : icons.DEBT({ size });
  const _flutuation = flutuation > 0 ? flutuation : flutuation * -1;

  if (_flutuation === 0) {
    return null;
  }

  return (
    <S.Container>
      <S.FlutuationText>
        {isLoading ? <></> : `${_flutuation.toFixed(0)}%`}
      </S.FlutuationText>
      {showIcon && !isLoading && <S.IconWrapper>{icon}</S.IconWrapper>}
    </S.Container>
  );
};

export default Flutuation;
