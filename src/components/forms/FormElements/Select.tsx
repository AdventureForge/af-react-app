/* eslint-disable @typescript-eslint/no-explicit-any */
import classNames from 'classnames';
import { FieldError, Path, UseFormRegister } from 'react-hook-form';
import FormErrorMessage from './FormErrorMessage';

interface SelectProps<T> {
  label: Path<T>;
  register: UseFormRegister<T>;
  dataList: any[];
  optionValue: string;
  required: boolean;
  htmlFor: string;
  pattern?: RegExp;
  errors?: FieldError;
  errorMessage?: string;
  type?: React.HTMLInputTypeAttribute;
  placeholder?: string;
  defaultValue?: string | number;
  optionKey: string | number;
  onChange?: (event: React.ChangeEvent<HTMLSelectElement>) => void;
}

// eslint-disable-next-line @typescript-eslint/no-unnecessary-type-constraint
const Select = <T extends unknown>({
  label,
  register,
  required,
  pattern,
  errors,
  errorMessage,
  htmlFor,
  optionValue,
  defaultValue,
  dataList,
  optionKey,
  onChange,
}: SelectProps<T>) => {
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
      <label htmlFor={htmlFor} className="block text-lg mb-1 pl-5 capitalize">
        {label}
      </label>
      <div className={classes}>
        <select
          {...register(label, { required, pattern })}
          name={htmlFor}
          className="inline-block bg-slate-900 text-violet-100"
          defaultValue={defaultValue}
          onChange={onChange}
        >
          {dataList.map((data: any) => (
            <option
              key={data[optionKey]}
              value={data.uuid}
              className="bg-slate-900"
            >
              {data[optionValue]}
            </option>
          ))}
        </select>
      </div>
      {errors && <FormErrorMessage>{errorMessage}</FormErrorMessage>}
    </div>
  );
};

export default Select;
