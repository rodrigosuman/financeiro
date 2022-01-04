import styled, { css } from 'styled-components/native';
import DefaultText from '../../components/atoms/DefaultText';
import StrongText from '../../components/atoms/StrongText';

export const FormContainer = styled.ScrollView`
  flex: 1;
`;

export const FormInputsContainer = styled.View`
  padding: 10px;
`;

export const FormItem = styled.View`
  margin-bottom: 40px;
`;

export const CustomDateAndValueWrapper = styled.View`
  ${({ theme }) => css`
    padding: 10px 0;
    margin-top: 32px;
  `}
`;

export const CustomValuesWrapper = styled.View`
  ${({ theme }) => css`
    border-top-width: 1px;
    margin-top: 18px;
    border-top-color: ${theme.colors.secondary}30;
  `}
`;

export const CustomFormTitle = styled(DefaultText)`
  ${({ theme }) => css`
    color: ${theme.colors.secondary};
    margin-bottom: 16px;
  `}
`;

export const AddCustomFormText = styled(StrongText)`
  ${({ theme }) => css`
    color: ${theme.colors.success};
    font-size: 14px;
    text-align: center;
    margin-bottom: 30px;
  `}
`;

export const CustomValuesItemHeader = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;
