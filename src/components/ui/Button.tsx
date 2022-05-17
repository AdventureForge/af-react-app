import { Link } from 'react-router-dom';

type Props = {
  onClick?: () => void;
  children?: React.ReactNode;
  color?: 'primary' | 'secondary';
  disabled?: boolean;
  value: string;
  type?: 'submit' | 'reset' | 'button';
  style?: 'plain' | 'outline';
  classes?: string;
};

const Button: React.FC<Props> = (props) => {
  const classes = `block border-2 rounded-full font-semibold 
  ${
    props?.style === 'outline'
      ? 'transparent text-violet-500 hover:bg-violet-800 hover:text-white'
      : 'bg-violet-500 text-white hover:bg-violet-800'
  } 
  py-2 px-8 cursor-pointer text-base border-violet-500 
  active:bg-violet-900 active:scale-105 transition ease-in-out`;

  return (
    <Link to="/">
      <button
        type={props.type || 'button'}
        className={`${classes} ${props.classes}`}
        disabled={props.disabled ?? false}
      >
        {props.value}
      </button>
    </Link>
  );
};

export default Button;
