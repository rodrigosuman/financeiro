import React from 'react';
import icons from '../../../icons';
import * as S from './styles';
import { CheckboxProps, CheckboxRef } from './types';

const Checkbox: React.ForwardRefRenderFunction<CheckboxRef, CheckboxProps> = (props, ref) => {
  const { onValue, initalValue } = props;

  const [checked, setChecked] = React.useState<boolean>(initalValue || false);

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

  return (
    <S.Container activeOpacity={0.7} onPress={toggleChecked}>
      {checked && icons.CHECK({ size: 24, color: 'secondary' })}
    </S.Container>
  );
};

export default React.forwardRef(Checkbox);
