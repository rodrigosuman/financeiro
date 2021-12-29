import { RouteProp, useRoute } from '@react-navigation/native';
import { FormHandles } from '@unform/core';
import { Form } from '@unform/mobile';
import { parseISO } from 'date-fns';
import React from 'react';
import { TouchableOpacity, View } from 'react-native';
import { useDispatch } from 'react-redux';
import Button from '../../components/atoms/Button';
import CurrencyInput from '../../components/atoms/CurrencyInput';
import DatePicker from '../../components/atoms/DatePicker';
import Dropdown from '../../components/atoms/Dropdown';
import Loading from '../../components/atoms/Loading/Loading';
import statementFrequency from '../../constants/statementsFrequency';
import useNavigation from '../../hooks/useNavigation';
import useSelector from '../../hooks/useSelector';
import icons from '../../icons';
import {
  asyncDeleteStatementAction,
  asyncPatchStatementAction,
  asyncPostStatementAction,
  setStatementsIsSendingAction
} from '../../redux-store/redux-actions/statements';
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
  const dispatch = useDispatch();

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
  const isSending = useSelector(state => state.statements.isSending);

  const setInitialData = React.useCallback((data: StatementFormData) => {
    const [date] = data.statementDate.split('T');

    formRef.current?.setData({
      ...data,
      statementDate: `${date}T23:59`,
      status: data.status,
    });
  }, []);

  const onDelete = React.useCallback(() => {
    dispatch(setStatementsIsSendingAction(true));
    dispatch(
      asyncDeleteStatementAction(
        params?.statement?.id,
        parseISO(params.statement?.statementDate + 'T23:59'),
      ),
    );
  }, [dispatch, params.statement?.id, params.statement?.statementDate]);

  const updateStatement = React.useCallback(
    (data: StatementFormData) => {
      dispatch(
        asyncPatchStatementAction({
          id: params?.statement?.id,
          statementDate: data.statementDate,
          statementType: data.statementType,
          value: Number(data.value),
          status: data.status,
        }),
      );
    },
    [dispatch, params?.statement?.id],
  );

  const onSubmit = React.useCallback(
    (data: StatementFormData) => {
      dispatch(setStatementsIsSendingAction(true));
      if (params?.statement) {
        dispatch(
          updateStatement({
            id: params?.statement?.id,
            statementDate: data.statementDate,
            statementType: data.statementType,
            value: data.value,
            status: data.status,
          }),
        );
      } else {
        dispatch(
          asyncPostStatementAction({
            statementDate: data.statementDate,
            statementType: data.statementType,
            value: Number(data.value),
          }),
        );
      }
    },
    [dispatch, params?.statement, updateStatement],
  );

  React.useEffect(() => {
    if (isSending === false) {
      navigation.goBack();
    }
  }, [dispatch, isSending, navigation]);

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () =>
        params?.statement?.id ? (
          <>
            {isSending ? (
              <Loading size={20} />
            ) : (
              <TouchableOpacity onPress={onDelete}>
                {icons.TRASH({ size: 24, color: 'secondary' })}
              </TouchableOpacity>
            )}
          </>
        ) : null,
      title: params?.statement?.id ? 'Editar lançamento' : 'Novo lançamento',
    });
  }, [isSending, navigation, onDelete, params]);

  React.useEffect(() => {
    if (params?.statement) {
      const { statement } = params;
      setInitialData({
        statementDate: new Date(statement.statementDate).toISOString(),
        statementType: statement.statementType.id,
        value: String(statement.value),
        status: statement.status,
      });
    }
  }, [params, setInitialData]);

  React.useImperativeHandle(ref, () => ({
    setInitialData,
  }));

  return (
    <View style={{ flex: 1 }}>
      <S.FormContainer>
        <Form onSubmit={onSubmit} ref={formRef}>
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

            {!params?.statement?.id && (
              <S.FormItem>
                <Dropdown
                  placeholder="Frequência"
                  options={statementFrequency}
                  name="frequency"
                />
              </S.FormItem>
            )}

            {params?.statement?.id && (
              <S.FormItem>
                <Dropdown
                  placeholder="Status"
                  options={[
                    {
                      title: 'Pago',
                      value: 'PAID',
                    },
                    {
                      title: 'Não pago',
                      value: 'NOT_PAID',
                    },
                  ]}
                  name="status"
                />
              </S.FormItem>
            )}

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
        isSending={isSending}
      />
    </View>
  );
};

export default React.forwardRef(StatmentCreateEditForm);
