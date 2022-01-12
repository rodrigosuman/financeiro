import { useField } from '@unform/core';
import React from 'react';
import icons from '../../../icons';
import * as S from './styles';
import { CheckboxProps, CheckboxRef } from './types';

const UnformCheckbox: React.ForwardRefRenderFunction<CheckboxRef, CheckboxProps> = (props, ref) => {
  const { onValue, initalValue, label, name } = props;

  const [checked, setChecked] = React.useState<boolean | undefined>(initalValue);

  const { fieldName, registerField, error } = useField(name);

  const checkRef = React.useRef<{ value?: boolean }>({ value: initalValue });

  const toggleChecked = React.useCallback(() => {
    setChecked(old => {
      const value = !old;

      onValue?.(value);
      return value;
    });
  }, [onValue]);

  React.useImperativeHandle(ref, () => {
    return {
      toggleChecked,
    };
  });

  React.useEffect(() => {
    registerField({
      name: fieldName,
      ref: checkRef.current,
      getValue() {
        if (checkRef.current) {
          return checkRef.current.value;
        }
        return undefined;
      },
      setValue(ref, value?: boolean) {
        if (checkRef.current) {
          setChecked(value);
          checkRef.current.value = value;
        }
      },
      clearValue() {
        if (checkRef.current) {
          setChecked(undefined);
          checkRef.current.value = undefined;
        }
      },
    });
  }, [fieldName, registerField]);

  React.useEffect(() => {
    if (checkRef.current) {
      checkRef.current.value = checked;
    }
  }, [checked]);

  return (
    // @ts-ignore
    <S.Wrapper ref={checkRef} activeOpacity={0.7} onPress={toggleChecked}>
      <S.Container>{checked && icons.CHECK({ size: 24, color: 'secondary' })}</S.Container>
      <S.Label>{label}</S.Label>
    </S.Wrapper>
  );
};

export default React.forwardRef(UnformCheckbox);
