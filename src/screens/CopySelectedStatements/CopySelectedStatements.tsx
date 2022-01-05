import { FormHandles } from '@unform/core';
import { Form } from '@unform/mobile';
import React from 'react';
import { View } from 'react-native';
import { useDispatch } from 'react-redux';
import Button from '../../components/atoms/Button';
import Dropdown from '../../components/atoms/Dropdown';
import useNavigation from '../../hooks/useNavigation';
import useSelector from '../../hooks/useSelector';
import {
  asyncCopyStatementsAction,
  setCopyStatementsIsSendingAction
} from '../../redux-store/redux-actions/statements';
import * as S from './styles';
import { CopyStatementsFormData } from './types';

const CopySelectedStatements: React.FC<{ onSuccess: () => void }> = ({ onSuccess }) => {
  const formRef = React.useRef<FormHandles>({} as FormHandles);
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const isSendingMultSelect = useSelector(state => state.statements.isSendingMultSelect);

  const multSelectedStatements = useSelector(state => state.statements.multSelectedStatements);

  const onSubmit = React.useCallback(
    (data: CopyStatementsFormData) => {
      dispatch(setCopyStatementsIsSendingAction(true));
      dispatch(
        asyncCopyStatementsAction({
          statements: multSelectedStatements.map(item => ({
            statementDate: item.statementDate,
            statementType: item.statementType.id,
            value: item.value,
          })),
          year: data.year,
        }),
      );
    },
    [dispatch, multSelectedStatements],
  );

  return (
    <View style={{ height: 350 }}>
      <S.FormContainer>
        <Form onSubmit={onSubmit} ref={formRef}>
          <S.FormInputsContainer>
            <Dropdown
              placeholder="Ano"
              name="year"
              options={[
                {
                  title: '2022',
                  value: 2022,
                },
                {
                  title: '2023',
                  value: 2023,
                },
                {
                  title: '2024',
                  value: 2024,
                },
                {
                  title: '2025',
                  value: 2025,
                },
                {
                  title: '2026',
                  value: 2026,
                },
                {
                  title: '2027',
                  value: 2027,
                },
                {
                  title: '2028',
                  value: 2028,
                },
                {
                  title: '2029',
                  value: 2029,
                },
                {
                  title: '2030',
                  value: 2030,
                },
              ]}
            />
          </S.FormInputsContainer>
        </Form>
      </S.FormContainer>

      <Button
        title="Copiar"
        variant="primary"
        onPress={() => formRef.current?.submitForm?.()}
        isSending={isSendingMultSelect}
      />
    </View>
  );
};

export default CopySelectedStatements;
