export type IconType = 'solid' | 'regular' | 'brand' | 'kit';

export type ButtonVariant = 
  | 'primary' 
  | 'secondary' 
  | 'tertiary' 
  | 'other' 
  | 'outline' 
  | 'danger' 
  | 'super' 
  | 'link' 
  | 'link-action' 
  | 'link-dark' 
  | 'link-light' 
  | 'override';

export type ButtonSize = 'sm' | 'md' | 'lg';

export const SuperNotAllowedVariants = ['danger', 'link-action', 'link-dark', 'link-light'];

export interface ButtonProps {
  title: string;
  size?: ButtonSize;
  variant?: ButtonVariant;
  disabled?: boolean;
  isSuper?: boolean;
  superVariant?: 'superBox' | 'premiumLock' | 'premiumFreeForSchools';
  loading?: boolean;
  type?: 'button' | 'submit' | 'reset';
  ariaLabel?: string;
  dataTestid?: string;
  fullWidth?: boolean;
  id?: string;
  lIcon?: string;
  lIconType?: IconType;
  tIcon?: string;
  tIconType?: IconType;
  maxLength?: number;
  onClick?: (ev: React.MouseEvent<HTMLButtonElement>) => void;
} 