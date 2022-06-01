import classNames from 'classnames';

export type FormErrorMessageProps = {
  className?: string;
  children?: React.ReactNode;
};

const FormErrorMessage: React.FC<FormErrorMessageProps> = ({
  children,
  className,
}) => (
  <p className={classNames('text-sm text-left block text-red-400', className)}>
    {children}
  </p>
);

export default FormErrorMessage;
