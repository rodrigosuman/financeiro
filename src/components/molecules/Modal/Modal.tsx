import React from 'react';
import { Modal as RNModal, TouchableOpacity } from 'react-native';
import icons from '../../../icons';
import * as S from './styles';
import { ModalProps, ModalRefProps } from './types';

const Modal: React.ForwardRefRenderFunction<ModalRefProps, ModalProps> = (
  props,
  ref,
) => {
  const { left } = props;
  const [visible, setVisible] = React.useState<boolean>(false);

  React.useImperativeHandle(ref, () => ({
    toggleVisible: () => setVisible(old => !old),
  }));

  return (
    <RNModal transparent visible={visible}>
      <S.Container>
        <S.ModalContentHeader>
          <TouchableOpacity onPress={() => setVisible(false)}>
            {icons.CLOSE({ size: 30 })}
          </TouchableOpacity>
          {left?.action && (
            <TouchableOpacity onPress={() => left?.action?.()}>
              <S.DeleteText>{left.text}</S.DeleteText>
            </TouchableOpacity>
          )}
        </S.ModalContentHeader>
        <S.ModalContent>{props.children}</S.ModalContent>
      </S.Container>
    </RNModal>
  );
};

export default React.forwardRef(Modal);
