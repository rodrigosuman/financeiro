import { useField } from '@unform/core';
import moment from 'moment';
import React from 'react';
import MonthSelectorCalendar from 'react-native-month-selector';
import { useTheme } from 'styled-components';
import FontName from '../../../constants/fontNames';
import icons from '../../../icons';
import Modal from '../../molecules/Modal/Modal';
import { ModalRefProps } from '../../molecules/Modal/types';
import * as S from './styles';
import { MounthSelectorProps, MounthSelectorRef } from './types';

const MounthSelector: React.ForwardRefRenderFunction<MounthSelectorRef, MounthSelectorProps> = (props, ref) => {
  const { onChange, renderInput = true, initalValue, placeholder = 'Selecione o mês', maxDate, name } = props;

  const [mounth, setMounth] = React.useState<moment.Moment | undefined>(initalValue);
  const modalRef = React.useRef<ModalRefProps>({ toggleVisible: () => {} });
  const selectorRef = React.useRef<{ value: Date | undefined }>();
  const theme = useTheme();

  const { fieldName, registerField, error } = useField(name);

  const formatedDate = mounth?.format('MM/YYYY');

  const setFormValue = React.useCallback((date?: Date) => {
    if (selectorRef.current) {
      selectorRef.current.value = date;
    }
  }, []);

  React.useImperativeHandle(ref, () => {
    return {
      toggleVisible: () => modalRef.current?.toggleVisible?.(),
    };
  });

  React.useEffect(() => {
    registerField({
      name: fieldName,
      ref: selectorRef.current,
      // @ts-ignore
      getValue() {
        if (selectorRef.current) {
          return selectorRef.current.value;
        }
        return undefined;
      },
      setValue(ref, value: Date) {
        if (selectorRef.current) {
          setMounth(moment(value));
          selectorRef.current.value = value;
        }
      },
      clearValue() {
        if (selectorRef.current) {
          setMounth(undefined);
          selectorRef.current.value = undefined;
        }
      },
    });
  }, [fieldName, registerField]);

  return (
    <React.Fragment>
      {renderInput && (
        <S.Container
          onPress={() => modalRef.current.toggleVisible?.()}
          // @ts-ignore
          ref={selectorRef}>
          <S.ValueWrapper>
            <S.ValueText>{formatedDate || placeholder}</S.ValueText>
          </S.ValueWrapper>
          {icons.CALENDAR({ size: 18 })}
        </S.Container>
      )}
      <Modal ref={modalRef}>
        <MonthSelectorCalendar
          maxDate={moment(new Date('2050-12-30'))}
          selectedDate={mounth}
          onMonthTapped={date => {
            setMounth(date);
            setFormValue(new Date(date.toISOString()));
            onChange?.({ mounth: date.month() + 1, year: date.year() });
            modalRef.current.toggleVisible?.();
          }}
          containerStyle={{
            backgroundColor: theme.colors.bgDark,
          }}
          monthTextStyle={{
            color: `${theme.colors.white}70`,
            fontFamily: FontName.REGULAR,
          }}
          selectedMonthTextStyle={{
            color: theme.colors.secondary,
            backgroundColor: `${theme.colors.white}00`,
          }}
          selectedBackgroundColor={`${theme.colors.white}15`}
          seperatorColor={`${theme.colors.white}15`}
          nextIcon={icons.ARROW_RIGHT()}
          prevIcon={icons.ARROW_LEFT()}
          currentMonthTextStyle={{
            color: `${theme.colors.secondary}`,
            fontFamily: FontName.MEDIUM,
          }}
          monthDisabledStyle={{
            color: `${theme.colors.white}20`,
          }}
          yearTextStyle={{
            color: `${theme.colors.secondary}`,
            fontFamily: FontName.LIGHT,
            fontSize: 16,
          }}
          selectedMonthStyle={{
            backgroundColor: theme.colors.secondary,
          }}
          initialView={initalValue}
        />
      </Modal>
    </React.Fragment>
  );
};

export default React.forwardRef(MounthSelector);
