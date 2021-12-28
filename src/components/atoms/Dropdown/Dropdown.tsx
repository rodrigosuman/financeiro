import React from 'react';
import { TouchableOpacity } from 'react-native';
import icons from '../../../icons';
import Modal from '../../molecules/Modal/Modal';
import { ModalRefProps } from '../../molecules/Modal/types';
import * as S from './styles';
import { DropdownOption, DropdownProps } from './types';

const Dropdown: React.FC<DropdownProps> = props => {
  const { options, placeholder, onValue } = props;
  const modalRef = React.useRef<ModalRefProps>({ toggleVisible: () => {} });
  const [selectedOption, setSelectedOption] = React.useState<DropdownOption>();

  const handleOnValue = React.useCallback(
    (option: DropdownOption) => {
      modalRef.current?.toggleVisible();
      setSelectedOption(option);
      onValue?.(option);
    },
    [onValue],
  );

  return (
    <React.Fragment>
      <S.Container onPress={() => modalRef.current?.toggleVisible()}>
        <S.ValueWrapper>
          <S.ValueText>{selectedOption?.value || placeholder}</S.ValueText>
        </S.ValueWrapper>
        {icons.CHEVRON_DOWN({ size: 16 })}
      </S.Container>
      <Modal ref={modalRef}>
        <S.DropdownOptions>
          {options?.map((option, key) => (
            <TouchableOpacity onPress={() => handleOnValue?.(option)} key={key}>
              <S.DropdownOptionText>{option.title}</S.DropdownOptionText>
            </TouchableOpacity>
          ))}
        </S.DropdownOptions>
      </Modal>
    </React.Fragment>
  );
};

export default Dropdown;
