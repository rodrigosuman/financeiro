import React from 'react';
import { KeyOfThemeColor } from '../../../styles';

export interface ModalRefProps {
  toggleVisible: () => void;
}

export interface ModalProps {
  left?: {
    text: string;
    action?: () => void;
    variant?: KeyOfThemeColor;
  };
  children?: React.ReactNode;
}
