import classNames from 'classnames';
import React from 'react';

type Props = {
  onClick?: () => void;
  children?: React.ReactNode;
  color?: 'primary' | 'secondary' | 'accent';
  disabled?: boolean;
  value: string;
  type?: 'submit' | 'reset' | 'button';
  style: 'plain' | 'outline' | 'danger-outline' | 'danger-plain';
  className?: string;
};
const Button: React.FC<Props> = (props) => {
  const defaultClasses = classNames(
    'block border-2 rounded-full font-semibold py-2 px-8 cursor-pointer text-base active:scale-105 transition ease-in-out',
    {
      'border-violet-500 active:bg-violet-900 transparent text-violet-500 hover:bg-violet-800 hover:text-white':
        props?.style === 'outline',
    },
    {
      'border-violet-500 active:bg-violet-900 bg-violet-500 text-white hover:bg-violet-800':
        props?.style === 'plain',
    },
    {
      'bg-transparent border-red-400 text-red-400 active:bg-red-900 hover:bg-red-800 hover:text-white':
        props.style === 'danger-outline',
    },
    {
      'bg-transparent border-red-400 text-red-400 active:bg-red-900 hover:bg-red-800 hover:text-white':
        props.style === 'danger-plain',
    }
  );
  return (
    <button
      value={props.value}
      type={props.type ?? 'button'}
      className={`${defaultClasses} ${props.className}`}
      onClick={props.onClick}
    >
      {props.value}
    </button>
  );
};

export default Button;
