import classNames from 'classnames';
import { FieldError, Path, UseFormRegister } from 'react-hook-form';
import FormErrorMessage from './FormErrorMessage';

interface InputProps<T> {
  label: Path<T>;
  register: UseFormRegister<T>;
  required: boolean;
  pattern?: RegExp;
  errors?: FieldError;
  errorMessage?: string;
  placeholder?: string;
  defaultValue?: string;
}

// eslint-disable-next-line @typescript-eslint/no-unnecessary-type-constraint
const TextArea = <T extends unknown>({
  label,
  register,
  required,
  pattern,
  errors,
  errorMessage,
  placeholder,
  defaultValue,
}: InputProps<T>) => {
  const classes = classNames(
    'border-2',
    'py-2',
    'px-8',
    'rounded-3xl',
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
      <textarea
        placeholder={placeholder}
        {...register(label, { required, pattern })}
        className={`${classes}`}
        defaultValue={defaultValue}
      />
      {errors && <FormErrorMessage>{errorMessage}</FormErrorMessage>}
    </div>
  );
};

export default TextArea;
