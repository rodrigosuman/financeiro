export interface DatePickerProps {
  placeholder: string;
  onValue?: (date: Date) => void;
  name: string;
  minimumDate?: Date;
  maximumDate?: Date;
}
