import React from 'react';

type Props = {
  children?: React.ReactNode;
  classes?: string;
};

const Card: React.FC<Props> = (props) => {
  return (
    <div
      className={`p-4 m-4 shadow-md rounded-md bg-violet-50 ${
        props.classes ? props.classes : ''
      }`}
    >
      {props.children}
    </div>
  );
};

export default Card;
