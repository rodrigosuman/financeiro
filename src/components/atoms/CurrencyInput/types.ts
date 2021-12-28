export interface CurrencyInputProps {
  placeholder: string;
  onValue?: (value: string, formatedValue?: string) => void;
  name: string;
}
