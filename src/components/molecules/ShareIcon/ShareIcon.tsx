import React from 'react';
import { TouchableOpacity } from 'react-native';
import { useDispatch } from 'react-redux';
import useSelector from '../../../hooks/useSelector';
import icons from '../../../icons';
import { setStatementsIsMultSelectAction } from '../../../redux-store/redux-actions/statements';
import CopySelectedStatements from '../../../screens/CopySelectedStatements/CopySelectedStatements';
import * as DropDownStyles from '../../atoms/Dropdown/styles';
import Modal from '../Modal/Modal';
import { ModalRefProps } from '../Modal/types';
import * as S from './styles';

const ShareIcon: React.FC = () => {
  const dispatch = useDispatch();

  const multSelectedStatements = useSelector(state => state.statements.multSelectedStatements);
  const isSending = useSelector(state => state.statements.isSending);
  const modalRef = React.useRef<ModalRefProps>({
    toggleVisible: () => {},
  });

  const modalCopyFormRef = React.useRef<ModalRefProps>({
    toggleVisible: () => {},
  });

  const onCancel = React.useCallback(() => {
    dispatch(setStatementsIsMultSelectAction(false));
    modalRef.current.toggleVisible();
    modalCopyFormRef.current.toggleVisible();
  }, [dispatch]);

  const totalSelected = multSelectedStatements?.length;
  const showTotalSelectedItems = Boolean(totalSelected);

  React.useEffect(() => {
    if (isSending === false) {
      onCancel();
    }
  }, [isSending, onCancel]);

  return (
    <React.Fragment>
      <S.Container onPress={() => modalRef.current.toggleVisible()}>
        {icons.SHARE({ size: 23 })}
        {showTotalSelectedItems && (
          <S.Dot>
            <S.DotText>{totalSelected}</S.DotText>
          </S.Dot>
        )}
      </S.Container>
      <Modal
        ref={modalRef}
        left={{
          text: 'Cancelar',
          action: onCancel,
        }}>
        <DropDownStyles.DropdownOptions>
          <TouchableOpacity
            onPress={() => {
              modalCopyFormRef.current.toggleVisible();
            }}>
            <DropDownStyles.DropdownOptionText>Copiar itens selecionados</DropDownStyles.DropdownOptionText>
          </TouchableOpacity>
        </DropDownStyles.DropdownOptions>
      </Modal>

      <Modal
        ref={modalCopyFormRef}
        left={{
          text: 'Cancelar',
          action: onCancel,
        }}>
        <CopySelectedStatements onSuccess={onCancel} />
      </Modal>
    </React.Fragment>
  );
};

export default ShareIcon;
