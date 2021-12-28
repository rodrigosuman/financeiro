export type DropdownOption = {
  title: string;
  value: any;
};

export interface DropdownProps {
  options: DropdownOption[];
  placeholder: string;
  onValue?: (option: DropdownOption) => void;
}
