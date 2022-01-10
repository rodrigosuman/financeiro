import { FormHandles } from '@unform/core';
import { Form } from '@unform/mobile';
import React from 'react';
import { View } from 'react-native';
import { useDispatch } from 'react-redux';
import Button from '../../components/atoms/Button';
import CurrencyInput from '../../components/atoms/CurrencyInput';
import DatePicker from '../../components/atoms/DatePicker';
import Dropdown from '../../components/atoms/Dropdown';
import useNavigation from '../../hooks/useNavigation';
import useSelector from '../../hooks/useSelector';
import { asyncUpdateCreditCardsAction, setStatementsIsSendingAction } from '../../redux-store/redux-actions/statements';
import * as S from './styles';
import { UpdateCardsFormData, UpdateCardsFormProps, UpdateCardsFormRef } from './types';

const UpdateCardsForm: React.ForwardRefRenderFunction<UpdateCardsFormRef, UpdateCardsFormProps> = (props, ref) => {
  const formRef = React.useRef<FormHandles>({} as FormHandles);
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const { mounth, year } = useSelector(state => state.statements.pagination);

  const MINIMUM_DATE = new Date(`${year}-${mounth > 9 ? mounth : `0${mounth}`}-01`);

  const statementTypes = useSelector(state => state.statementTypes);
  const isSending = useSelector(state => state.statements.isSending);

  const onSubmit = React.useCallback(
    (data: UpdateCardsFormData) => {
      dispatch(setStatementsIsSendingAction(true));
      dispatch(
        asyncUpdateCreditCardsAction({
          ...data,
          firstIstallment: new Date(data.firstIstallment).toISOString(),
        }),
      );
    },
    [dispatch],
  );

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
              <Dropdown
                placeholder="Parcelas"
                options={[
                  {
                    title: '1',
                    value: 1,
                  },
                  {
                    title: '2',
                    value: 2,
                  },
                  {
                    title: '3',
                    value: 3,
                  },
                  {
                    title: '4',
                    value: 4,
                  },
                  {
                    title: '5',
                    value: 5,
                  },
                  {
                    title: '6',
                    value: 6,
                  },
                  {
                    title: '6',
                    value: 6,
                  },
                  {
                    title: '9',
                    value: 9,
                  },
                  {
                    title: '10',
                    value: 10,
                  },
                  {
                    title: '11',
                    value: 11,
                  },
                  {
                    title: '12',
                    value: 12,
                  },
                ]}
                name="installments"
              />
            </S.FormItem>

            <S.FormItem>
              <DatePicker
                name="firstIstallment"
                placeholder="Primeira parcela para"
                display="spinner"
                minimumDate={MINIMUM_DATE}
              />
            </S.FormItem>
          </S.FormInputsContainer>
        </Form>
      </S.FormContainer>

      <Button title="Salvar" variant="primary" onPress={() => formRef.current?.submitForm?.()} isSending={isSending} />
    </View>
  );
};

export default React.forwardRef(UpdateCardsForm);
