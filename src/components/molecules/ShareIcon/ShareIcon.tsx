import React from 'react';
import { TouchableOpacity } from 'react-native';
import { useDispatch } from 'react-redux';
import useSelector from '../../../hooks/useSelector';
import icons from '../../../icons';
import { clearStatementsMultSelectedItemAction } from '../../../redux-store/redux-actions/statements';
import CopySelectedStatements from '../../../screens/CopySelectedStatements/CopySelectedStatements';
import * as DropDownStyles from '../../atoms/Dropdown/styles';
import Modal from '../Modal/Modal';
import { ModalRefProps } from '../Modal/types';
import * as S from './styles';

const ShareIcon: React.FC = () => {
  const dispatch = useDispatch();

  const multSelectedStatements = useSelector(state => state.statements.multSelectedStatements);
  const isSendingMultSelect = useSelector(state => state.statements.isSendingMultSelect);
  const modalRef = React.useRef<ModalRefProps>({
    toggleVisible: () => {},
  });

  const modalCopyFormRef = React.useRef<ModalRefProps>({
    toggleVisible: () => {},
  });

  const totalSelected = multSelectedStatements?.length;
  const showTotalSelectedItems = Boolean(totalSelected);

  const onCancel = React.useCallback(() => {
    modalRef.current.toggleVisible();
    modalCopyFormRef.current.toggleVisible();
    dispatch(clearStatementsMultSelectedItemAction());
  }, [dispatch]);

  React.useEffect(() => {
    if (isSendingMultSelect === false) {
      onCancel();
    }
  }, [isSendingMultSelect, onCancel]);

  return (
    <React.Fragment>
      <S.Container onPress={() => modalRef.current.toggleVisible()}>
        {icons.SHARE({ size: 24 })}
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
