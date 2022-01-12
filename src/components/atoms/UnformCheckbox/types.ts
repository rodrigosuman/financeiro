export interface CheckboxRef {
  toggleChecked: () => void;
}

export interface CheckboxProps {
  onValue?: (value: boolean) => void;
  initalValue?: boolean;
  label: string;
  name: string;
}
