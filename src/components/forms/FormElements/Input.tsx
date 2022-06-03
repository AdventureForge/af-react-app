import classNames from 'classnames';
import React, { ReactEventHandler } from 'react';
import { FieldError, Path, UseFormRegister } from 'react-hook-form';
import FormErrorMessage from './FormErrorMessage';

interface InputProps<T> {
  label: Path<T>;
  register: UseFormRegister<T>;
  required: boolean;
  pattern?: RegExp;
  errors?: FieldError | undefined;
  errorMessage?: string;
  type?: React.HTMLInputTypeAttribute;
  placeholder?: string;
  defaultValue?: string;
  onChange?: (event: ReactEventHandler) => void;
}

// eslint-disable-next-line @typescript-eslint/no-unnecessary-type-constraint
const Input = <T extends unknown>({
  label,
  register,
  required,
  pattern,
  errors,
  errorMessage,
  type,
  placeholder,
  defaultValue,
}: InputProps<T>) => {
  const classes = classNames(
    'border-2',
    'rounded-full',
    'py-2',
    'px-8',
    'cursor-text',
    'text-base',
    'border-violet-500',
    'form-control',
    'block',
    'w-full',
    'font-normal',
    'bg-transparent',
    'bg-clip-padding',
    'border-solid',
    'transition',
    'ease-in-out',
    'm-0',
    'focus:outline-none',
    { 'border-red-400': errors }
  );
  return (
    <div className="mt-6">
      <label className="block text-lg mb-1 pl-5 capitalize">{label}</label>
      <input
        type={type ?? 'text'}
        placeholder={placeholder}
        {...register(label, { required, pattern })}
        className={classes}
        defaultValue={defaultValue}
      />
      {errors && <FormErrorMessage>{errorMessage}</FormErrorMessage>}
    </div>
  );
};

export default Input;
