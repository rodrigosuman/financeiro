import { RouteProp, useRoute } from '@react-navigation/native';
import { FormHandles } from '@unform/core';
import { Form } from '@unform/mobile';
import React from 'react';
import { TouchableOpacity } from 'react-native';
import Button from '../../components/atoms/Button';
import CurrencyInput from '../../components/atoms/CurrencyInput';
import DatePicker from '../../components/atoms/DatePicker';
import Dropdown from '../../components/atoms/Dropdown';
import statementFrequency from '../../constants/statementsFrequency';
import useNavigation from '../../hooks/useNavigation';
import useSelector from '../../hooks/useSelector';
import icons from '../../icons';
import { APIStatementType } from '../../types';
import * as S from './styles';
import {
  StatementCreateEditFormProps,
  StatementCreateEditFormRef,
  StatementFormData
} from './types';

const StatmentCreateEditForm: React.ForwardRefRenderFunction<
  StatementCreateEditFormRef,
  StatementCreateEditFormProps
> = (props, ref) => {
  const formRef = React.useRef<FormHandles>({} as FormHandles);
  const navigation = useNavigation();

  const params =
    useRoute<
      RouteProp<
        Record<
          string,
          { statement: APIStatementType; maximumDate: Date; minimumDate: Date }
        >,
        string
      >
    >().params;

  const statementTypes = useSelector(state => state.statementTypes);

  const setInitialData = React.useCallback((data: StatementFormData) => {
    formRef.current?.setData(data);
  }, []);

  React.useEffect(() => {
    if (params?.statement) {
      const { statement } = params;
      setInitialData({
        statementDate: new Date(statement.statementDate).toISOString(),
        statementType: statement.statementType.id,
        value: String(statement.value),
      });
    }
  }, [params, setInitialData]);

  React.useImperativeHandle(ref, () => ({
    setInitialData,
  }));

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () =>
        params?.statement?.id ? (
          <TouchableOpacity>
            {icons.TRASH({ size: 24, color: 'secondary' })}
          </TouchableOpacity>
        ) : null,
      title: params?.statement?.id ? 'Editar lançamento' : 'Novo lançamento',
    });
  }, [navigation, params]);

  return (
    <React.Fragment>
      <S.FormContainer>
        <Form onSubmit={data => console.log(data)} ref={formRef}>
          <S.FormInputsContainer>
            <S.FormItem>
              <Dropdown
                placeholder="Tipo"
                options={statementTypes?.data?.map(statementType => ({
                  title: statementType.description,
                  value: statementType.id,
                }))}
                name="statementType"
              />
            </S.FormItem>

            <S.FormItem>
              <DatePicker
                placeholder="Data"
                name="statementDate"
                maximumDate={params.maximumDate}
                minimumDate={params.minimumDate}
              />
            </S.FormItem>

            <S.FormItem>
              <Dropdown
                placeholder="Frequência"
                options={statementFrequency}
                name="frequency"
              />
            </S.FormItem>

            <S.FormItem>
              <CurrencyInput name="value" placeholder="Valor" />
            </S.FormItem>
          </S.FormInputsContainer>
        </Form>
      </S.FormContainer>
      <Button
        title="Salvar"
        variant="primary"
        onPress={() => formRef.current?.submitForm?.()}
      />
    </React.Fragment>
  );
};

export default React.forwardRef(StatmentCreateEditForm);
