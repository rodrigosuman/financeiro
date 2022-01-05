import React from 'react';
import { Modal as RNModal, TouchableOpacity } from 'react-native';
import icons from '../../../icons';
import Button from '../../atoms/Button';
import * as S from './styles';
import { ModalProps, ModalRefProps } from './types';

const Modal: React.ForwardRefRenderFunction<ModalRefProps, ModalProps> = (props, ref) => {
  const { left } = props;
  const [visible, setVisible] = React.useState<boolean>(false);

  React.useImperativeHandle(ref, () => ({
    toggleVisible: () => setVisible(old => !old),
  }));

  return (
    <RNModal transparent visible={visible} onRequestClose={() => setVisible(false)}>
      <S.Container>
        <S.ModalContentHeader>
          <TouchableOpacity onPress={() => setVisible(false)}>{icons.CLOSE({ size: 30 })}</TouchableOpacity>
        </S.ModalContentHeader>
        <S.ModalContent>{props.children}</S.ModalContent>
        {left?.action && <Button size="SMALL" title={left.text} variant="error" onPress={() => left?.action?.()} />}
      </S.Container>
    </RNModal>
  );
};

export default React.forwardRef(Modal);
