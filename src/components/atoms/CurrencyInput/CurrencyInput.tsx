import { useField } from '@unform/core';
import React from 'react';
import { useTheme } from 'styled-components';
import useCurrencyFormater from '../../../hooks/useCurrencyFormater';
import * as S from './styles';
import { CurrencyInputProps } from './types';

const CurrencyInput: React.FC<CurrencyInputProps> = props => {
  const { placeholder, onValue, name } = props;

  const currencyFormater = useCurrencyFormater('BRL');
  const theme = useTheme();

  const inputRef = React.useRef<any>(null);
  const [value, setValue] = React.useState<string>();

  const { fieldName, registerField, error } = useField(name);

  const handleInputChange = React.useCallback(
    (value: string) => {
      setValue(value);
      onValue?.(value, '');
    },
    [onValue],
  );

  React.useEffect(() => {
    inputRef.current.value = Number(value);
  }, [value]);

  React.useEffect(() => {
    registerField({
      name: fieldName,
      ref: inputRef.current,
      getValue() {
        if (inputRef.current) {
          return inputRef.current.value;
        }
        return '';
      },
      setValue(ref, value: string) {
        if (inputRef.current) {
          setValue(value);
          inputRef.current.value = Number(value);
        }
      },
      clearValue() {
        if (inputRef.current) {
          setValue(undefined);
          inputRef.current.value = undefined;
        }
      },
    });
  }, [fieldName, registerField]);

  return (
    <React.Fragment>
      <S.Container ref={inputRef}>
        <S.ValueWrapper>
          <S.CurrencyInput
            value={value}
            onChangeText={handleInputChange}
            keyboardType="numeric"
            placeholder={placeholder}
            placeholderTextColor={theme.colors.white}
          />
        </S.ValueWrapper>
      </S.Container>
    </React.Fragment>
  );
};

export default CurrencyInput;
