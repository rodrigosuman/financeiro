export interface TextAreaProps {
  placeholder: string;
  onValue?: (value: string, formatedValue?: string) => void;
  name: string;
}
