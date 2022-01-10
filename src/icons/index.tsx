import React from 'react';
import { KeyOfThemeColor } from '../styles';
import ArrowDown from './ArrowDown';
import ArrowLeft from './ArrowLeft';
import ArrowRight from './ArrowRight';
import ArrowUp from './ArrowUp';
import Calendar from './Calendar';
import Check from './Check';
import ChevronDown from './ChevronDown';
import Close from './Close';
import Copy from './Copy';
import CreditCard from './CreditCard';
import Filter from './Filter';
import Minus from './Minus';
import MultChecks from './MultChecks';
import Return from './Return';
import Share from './Share';
import Trash from './Trash';

interface Props {
  size?: number;
  color?: KeyOfThemeColor;
}

const icons = {
  CREDIT: (props?: Props) => <ArrowUp {...props} />,
  DEBT: (props?: Props) => <ArrowDown {...props} />,
  FILTER: (props?: Props) => <Filter {...props} />,
  ARROW_LEFT: (props?: Props) => <ArrowLeft {...props} />,
  ARROW_RIGHT: (props?: Props) => <ArrowRight {...props} />,
  CHEVRON_DOWN: (props?: Props) => <ChevronDown {...props} />,
  CALENDAR: (props?: Props) => <Calendar {...props} />,
  CLOSE: (props?: Props) => <Close {...props} />,
  TRASH: (props?: Props) => <Trash {...props} />,
  MINUS: (props?: Props) => <Minus {...props} />,
  COPY: (props?: Props) => <Copy {...props} />,
  CHECK: (props?: Props) => <Check {...props} />,
  MULT_CHECK: (props?: Props) => <MultChecks {...props} />,
  SHARE: (props?: Props) => <Share {...props} />,
  RETURN: (props?: Props) => <Return {...props} />,
  CREDIT_CARD: (props?: Props) => <CreditCard {...props} />,
};

export default icons;
