import { ThemeColor } from '../../../styles';

export type ButtonVariant = keyof ThemeColor;

export type ButtonSize = 'DEFAULT' | 'SMALL';

export interface ButtonProps {
  onPress: () => void;
  title: string;
  variant?: ButtonVariant;
  isSending?: boolean;
  size?: ButtonSize;
}
