import classNames from 'classnames';
import { Link } from 'react-router-dom';

type Props = {
  onClick?: () => void;
  children?: React.ReactNode;
  color?: 'primary' | 'secondary';
  disabled?: boolean;
  value: string;
  type?: 'submit' | 'reset' | 'button';
  style?: 'plain' | 'outline';
  className?: string;
};

const ButtonLink: React.FC<Props> = (props) => {
  const defaultClasses = classNames(
    'block border-2 rounded-full font-semibold py-2 px-8 cursor-pointer text-base border-violet-500 active:bg-violet-900 active:scale-105 transition ease-in-out',
    {
      'transparent text-violet-500 hover:bg-violet-800 hover:text-white':
        props?.style === 'outline',
    },
    {
      'bg-violet-500 text-white hover:bg-violet-800':
        props?.style !== 'outline',
    }
  );

  return (
    <Link to="/">
      <button
        type={props.type || 'button'}
        className={`${defaultClasses} ${props.className}`}
        disabled={props.disabled ?? false}
        onClick={props.onClick}
      >
        {props.children} {props.value}
      </button>
    </Link>
  );
};

export default ButtonLink;
