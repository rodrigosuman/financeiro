import { RouteProp, useRoute } from '@react-navigation/native';
import { FormHandles, Scope } from '@unform/core';
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
import statementFrequency, {
  FrequencyType
} from '../../constants/statementsFrequency';
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

const FormValueAndDate = ({ params }: any) => {
  return (
    <React.Fragment>
      <S.FormItem>
        <CurrencyInput name="value" placeholder="Valor" />
      </S.FormItem>

      <S.FormItem>
        <DatePicker
          placeholder="Data"
          name="statementDate"
          maximumDate={params.maximumDate}
          minimumDate={params.minimumDate}
        />
      </S.FormItem>
    </React.Fragment>
  );
};

const FormValueAndDateScoped = ({ values, index, onMinus, onValue }: any) => {
  const handleOnValue = React.useCallback(
    (key: string, value: any) => {
      onValue({
        ...values,
        [key]: value,
      });
    },
    [onValue, values],
  );
  return (
    <S.CustomDateAndValueWrapper>
      <S.CustomValuesItemHeader>
        <S.CustomFormTitle>Item {index + 1}</S.CustomFormTitle>
        <TouchableOpacity
          onPress={() => {
            onMinus(index);
          }}>
          {icons.MINUS({ color: 'secondary', size: 26 })}
        </TouchableOpacity>
      </S.CustomValuesItemHeader>
      <Scope path={`customValues[${index}]`}>
        <S.FormItem>
          <CurrencyInput
            name="value"
            placeholder="Valor"
            onValue={value => {
              handleOnValue('value', value);
            }}
          />
        </S.FormItem>

        <S.FormItem>
          <DatePicker
            placeholder="Data"
            name="statementDate"
            onValue={value => {
              handleOnValue('statementDate', value);
            }}
          />
        </S.FormItem>
      </Scope>
    </S.CustomDateAndValueWrapper>
  );
};

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

  const [frequency, setFrequency] = React.useState<FrequencyType>();
  const [customValues, setCustomValues] = React.useState<
    { value?: number; statementDate?: Date }[]
  >([
    {
      statementDate: undefined,
      value: undefined,
    },
  ]);

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
            status: data.status,
            frequency: data.frequency,
            customValues: data.customValues,
          }),
        );
      }
    },
    [dispatch, params?.statement, updateStatement],
  );

  const addCustomFormValue = React.useCallback(() => {
    setCustomValues(oldValues => {
      const formData = formRef.current.getData();
      const customValues = [
        ...oldValues,
        { value: undefined, statementDate: undefined },
      ];

      formRef.current.setData({
        ...formData,
        value: formData.value && String(formData.value),
        customValues: customValues.map(item => ({
          value: item.value && String(item.value),
          statementDate: item.statementDate,
        })),
      });

      return customValues;
    });
  }, []);

  const updateCustomValue = React.useCallback((values, index) => {
    setCustomValues(oldValues => {
      const formData = formRef.current.getData();

      const customValues = [...oldValues];
      const item = customValues[index] || {
        value: undefined,
        statementDate: undefined,
      };

      customValues[index] = {
        ...item,
        ...values,
      };

      formRef.current.setData({
        ...formData,
        value: formData.value && String(formData.value),
        customValues: customValues.map(item => ({
          value: item.value && String(item.value),
          statementDate: item.statementDate,
        })),
      });

      return customValues;
    });
  }, []);

  const removeCustomFormValue = React.useCallback(index => {
    setCustomValues(oldValues => {
      const formData = formRef.current.getData();
      const customValues = [...oldValues];

      customValues.splice(index, 1);

      formRef.current.setData({
        ...formData,
        value: formData.value && String(formData.value),
        customValues: customValues.map(item => ({
          value: item.value && String(item.value),
          statementDate: item.statementDate,
        })),
      });

      return customValues;
    });
  }, []);

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

            {!params?.statement?.id && (
              <S.FormItem>
                <Dropdown
                  placeholder="Frequência"
                  options={statementFrequency}
                  name="frequency"
                  onValue={option => {
                    setFrequency(option.value);
                  }}
                />
              </S.FormItem>
            )}

            <FormValueAndDate params={params} />

            {frequency === 'CUSTOM' && (
              <S.CustomValuesWrapper>
                {customValues.map((customValue, index) => (
                  <FormValueAndDateScoped
                    onValue={(values: any) => updateCustomValue(values, index)}
                    index={index}
                    onMinus={removeCustomFormValue}
                    value={customValue}
                  />
                ))}

                <TouchableOpacity onPress={addCustomFormValue}>
                  <S.AddCustomFormText>Adicionar novo item</S.AddCustomFormText>
                </TouchableOpacity>
              </S.CustomValuesWrapper>
            )}
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
