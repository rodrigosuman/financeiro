export interface OnMounthSelectorChangeArgs {
  year: number;
  mounth: number;
}

export interface MounthSelectorProps {
  onChange?: (args: OnMounthSelectorChangeArgs) => void;
  renderInput?: false;
  initalValue?: moment.Moment;
  name: string;
  placeholder?: string;
  maxDate?: Date;
}
export interface MounthSelectorRef {
  toggleVisible: () => void;
}
