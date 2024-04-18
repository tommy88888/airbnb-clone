'use client';

import { cn } from '@/lib/utils';
import { IconType } from 'react-icons';

type BtnProps = {
  label: string;
  onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
  disabled?: boolean;
  outline?: boolean;
  small?: boolean;
  icon?: IconType;
  type?: 'submit' | 'button' | 'reset' | undefined;
};

const Btn = ({
  label,
  onClick,
  disabled,
  outline,
  small,
  type,
  icon: Icon,
}: BtnProps) => {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={cn(
        `relative disabled:opacity-70 disabled:cursor-not-allowed rounded-lg hover:opacity-80 transition w-full`,
        outline ? 'bg-white' : 'bg-red-500',
        outline ? 'border-black' : 'border-red-500',
        outline ? 'text-black' : 'text-white',
        small ? 'py-1' : 'py-3',
        small ? 'text-sm' : 'text-md',
        small ? 'font-light' : 'font-semibold',
        small ? 'border-[1px]' : 'border-2'
      )}
    >
      {Icon && <Icon size={24} className='absolute left-4 top-3 ' />}
      {label}
    </button>
  );
};

export default Btn;
