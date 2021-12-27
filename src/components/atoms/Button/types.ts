export type ButtonVariant = 'primary' | 'secondary' | 'danger' | 'success';

export interface ButtonProps {
  onPress: () => void;
  title: string;
  variant?: ButtonVariant;
}
