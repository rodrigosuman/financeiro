import { FormHandles } from '@unform/core';
import { Form } from '@unform/mobile';
import React from 'react';
import { View } from 'react-native';
import { useDispatch } from 'react-redux';
import Button from '../../components/atoms/Button';
import CurrencyInput from '../../components/atoms/CurrencyInput';
import Dropdown from '../../components/atoms/Dropdown';
import { DropdownOption } from '../../components/atoms/Dropdown/types';
import MounthSelector from '../../components/atoms/MounthSelector/MounthSelector';
import UnformCheckbox from '../../components/atoms/UnformCheckbox';
import useNavigation from '../../hooks/useNavigation';
import useSelector from '../../hooks/useSelector';
import { asyncUpdateCreditCardsAction, setStatementsIsSendingAction } from '../../redux-store/redux-actions/statements';
import * as S from './styles';
import { UpdateCardsFormData } from './types';

const UpdateCardsForm: React.FC = () => {
  const formRef = React.useRef<FormHandles>({} as FormHandles);
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const statementTypes = useSelector(state => state.statementTypes);
  const isSending = useSelector(state => state.statements.isSending);

  const onSubmit = React.useCallback(
    (data: UpdateCardsFormData) => {
      dispatch(setStatementsIsSendingAction(true));
      dispatch(
        asyncUpdateCreditCardsAction({
          ...data,
          isTotalValue: !data.isTotalValue,
          firstIstallment: new Date(data.firstIstallment).toISOString(),
        }),
      );
    },
    [dispatch],
  );

  const installments = (): DropdownOption[] => {
    const MAX_INSTALLMENTS = 15;
    const options: DropdownOption[] = [];

    for (let index = 1; index <= MAX_INSTALLMENTS; index++) {
      options.push({
        title: `${index}`,
        value: index,
      });
    }

    return options;
  };

  React.useEffect(() => {
    if (isSending === false) {
      navigation.goBack();
    }
  }, [dispatch, isSending, navigation]);

  return (
    <View style={{ flex: 1 }}>
      <S.FormContainer>
        <Form onSubmit={onSubmit} ref={formRef}>
          <S.FormInputsContainer>
            <S.FormItem>
              <Dropdown
                placeholder="Tipo"
                options={statementTypes?.data
                  ?.filter(statementType => statementType.isCard)
                  ?.map(statementType => ({
                    title: statementType.description,
                    value: statementType.id,
                  }))}
                name="statementType"
              />
            </S.FormItem>

            <S.FormItem>
              <CurrencyInput name="totalValue" placeholder="Valor total" />
            </S.FormItem>

            <S.FormItem>
              <Dropdown placeholder="Parcelas" options={installments()} name="installments" />
            </S.FormItem>

            <S.FormItem>
              <MounthSelector name="firstIstallment" placeholder="Primeira parcela para" />
            </S.FormItem>

            <S.FormItem>
              <UnformCheckbox name="isTotalValue" label="Valor por parcela" />
            </S.FormItem>
          </S.FormInputsContainer>
        </Form>
      </S.FormContainer>

      <Button title="Salvar" variant="primary" onPress={() => formRef.current?.submitForm?.()} isSending={isSending} />
    </View>
  );
};

export default UpdateCardsForm;
