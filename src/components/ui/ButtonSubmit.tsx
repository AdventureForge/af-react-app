import classNames from 'classnames';

type Props = {
  value: string;
};

const ButtonSubmit: React.FC<Props> = (props) => {
  const classes = classNames(
    'mt-6 block border-2 rounded-full font-semibold w-40 py-2 px-8 cursor-pointer text-base border-violet-500 active:bg-violet-900 active:scale-105 transition ease-in-out bg-violet-500 text-white hover:bg-violet-800'
  );
  return (
    <button value="save" type="submit" className={classes}>
      {props.value}
    </button>
  );
};

export default ButtonSubmit;
