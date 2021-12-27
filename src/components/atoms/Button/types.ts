import { ThemeColor } from '../../../styles';

export type ButtonVariant = keyof ThemeColor;

export interface ButtonProps {
  onPress: () => void;
  title: string;
  variant?: ButtonVariant;
}
