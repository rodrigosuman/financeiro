import { useField } from '@unform/core';
import React from 'react';
import { useTheme } from 'styled-components';
import * as S from './styles';
import { TextAreaProps } from './types';

const TextArea: React.FC<TextAreaProps> = props => {
  const { placeholder, onValue, name } = props;

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
    inputRef.current.value = value;
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
          inputRef.current.value = value;
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
          <S.TextArea
            value={value}
            onChangeText={handleInputChange}
            placeholder={placeholder}
            placeholderTextColor={theme.colors.white}
            multiline
            numberOfLines={3}
          />
        </S.ValueWrapper>
      </S.Container>
    </React.Fragment>
  );
};

export default TextArea;
