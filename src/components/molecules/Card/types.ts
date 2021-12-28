import { ThemeColor } from '../../../styles';

export type CardVariant = keyof ThemeColor;

export interface CardProps {
  headerProps: {
    title: string;
    right?: () => JSX.Element;
  };
  variant?: CardVariant;
  isLoading?: boolean;
}
