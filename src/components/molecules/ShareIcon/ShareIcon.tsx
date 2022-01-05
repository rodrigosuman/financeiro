import React from 'react';
import { BackHandler } from 'react-native';
import { useDispatch } from 'react-redux';
import useSelector from '../../../hooks/useSelector';
import icons from '../../../icons';
import { clearStatementsMultSelectedItemAction } from '../../../redux-store/redux-actions/statements';
import CopySelectedStatements from '../../../screens/CopySelectedStatements/CopySelectedStatements';
import Modal from '../Modal/Modal';
import { ModalRefProps } from '../Modal/types';
import * as S from './styles';

const ShareIcon: React.FC = () => {
  const dispatch = useDispatch();

  const multSelectedStatements = useSelector(state => state.statements.multSelectedStatements);
  const isSendingMultSelect = useSelector(state => state.statements.isSendingMultSelect);

  const modalCopyFormRef = React.useRef<ModalRefProps>({
    toggleVisible: () => {},
  });

  const totalSelected = multSelectedStatements?.length;
  const showTotalSelectedItems = Boolean(totalSelected);

  const onCancel = React.useCallback(() => {
    modalCopyFormRef.current.toggleVisible();
    dispatch(clearStatementsMultSelectedItemAction());
  }, [dispatch]);

  React.useEffect(() => {
    if (isSendingMultSelect === false) {
      onCancel();
    }
  }, [isSendingMultSelect, onCancel]);

  React.useEffect(() => {
    const backhandler = BackHandler.addEventListener('hardwareBackPress', () => {
      onCancel();

      return true;
    });
    return () => {
      backhandler.remove();
    };
  }, [onCancel, showTotalSelectedItems]);

  return (
    <React.Fragment>
      <S.Container onPress={() => modalCopyFormRef.current.toggleVisible()}>{icons.COPY({ size: 20 })}</S.Container>

      <S.Container onPress={() => onCancel()}>{icons.TRASH({ size: 20, color: 'secondary' })}</S.Container>

      <S.Container onPress={() => onCancel()}>{icons.CHECK({ size: 24 })}</S.Container>

      <S.Container onPress={() => onCancel()}>
        {icons.RETURN({ size: 20 })}
        {showTotalSelectedItems && (
          <S.Dot>
            <S.DotText>{totalSelected}</S.DotText>
          </S.Dot>
        )}
      </S.Container>

      <Modal ref={modalCopyFormRef}>
        <CopySelectedStatements onSuccess={onCancel} />
      </Modal>
    </React.Fragment>
  );
};

export default ShareIcon;
